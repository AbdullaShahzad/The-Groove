package com.thegroove.dao;

import com.thegroove.config.DatabaseConnection;
import com.thegroove.model.Order;
import com.thegroove.model.OrderItem;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * JDBC Data Access Object (DAO) for Orders & Dispatches in MySQL.
 * Uses ACID transactions to ensure atomic order creation and stock deduction.
 */
public class OrderDAO {

    private static final Logger LOGGER = Logger.getLogger(OrderDAO.class.getName());

    /**
     * Creates an order and its line items inside an ACID transaction.
     */
    public boolean createOrder(Order order) {
        String insertOrderSql = "INSERT INTO orders (order_id, status, recipient_name, recipient_email, " +
                                "street_address, city, postal_code, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        String insertItemSql = "INSERT INTO order_items (order_id, volume_id, vol_string, title, author, unit_price, quantity) " +
                               "VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        String updateStockSql = "UPDATE volumes SET stock_count = stock_count - ? WHERE id = ? AND stock_count >= ?";

        Connection conn = null;
        try {
            conn = DatabaseConnection.getConnection();
            conn.setAutoCommit(false); // Begin JDBC Transaction

            // 1. Insert Order master record
            try (PreparedStatement orderStmt = conn.prepareStatement(insertOrderSql)) {
                orderStmt.setString(1, order.getOrderId());
                orderStmt.setString(2, order.getStatus());
                orderStmt.setString(3, order.getRecipientName());
                orderStmt.setString(4, order.getRecipientEmail());
                orderStmt.setString(5, order.getStreetAddress());
                orderStmt.setString(6, order.getCity());
                orderStmt.setString(7, order.getPostalCode());
                orderStmt.setBigDecimal(8, order.getTotalAmount());
                orderStmt.executeUpdate();
            }

            // 2. Insert Order line items & update stock
            try (PreparedStatement itemStmt = conn.prepareStatement(insertItemSql);
                 PreparedStatement stockStmt = conn.prepareStatement(updateStockSql)) {

                for (OrderItem item : order.getItems()) {
                    itemStmt.setString(1, order.getOrderId());
                    itemStmt.setString(2, item.getVolumeId());
                    itemStmt.setString(3, item.getVolString());
                    itemStmt.setString(4, item.getTitle());
                    itemStmt.setString(5, item.getAuthor());
                    itemStmt.setBigDecimal(6, item.getUnitPrice());
                    itemStmt.setInt(7, item.getQuantity());
                    itemStmt.addBatch();

                    // Deduct stock
                    stockStmt.setInt(1, item.getQuantity());
                    stockStmt.setString(2, item.getVolumeId());
                    stockStmt.setInt(3, item.getQuantity());
                    stockStmt.addBatch();
                }

                itemStmt.executeBatch();
                stockStmt.executeBatch();
            }

            conn.commit(); // Commit Transaction
            LOGGER.info("Order successfully committed with ID: " + order.getOrderId());
            return true;

        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error creating order. Rolling back transaction.", e);
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    LOGGER.log(Level.SEVERE, "Rollback failed", ex);
                }
            }
            return false;
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException e) {
                    LOGGER.log(Level.WARNING, "Error restoring connection auto-commit", e);
                }
            }
        }
    }

    /**
     * Retrieves all past orders with line items.
     */
    public List<Order> findAllOrders() {
        List<Order> orders = new ArrayList<>();
        String sql = "SELECT * FROM orders ORDER BY order_date DESC";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Order order = new Order();
                order.setOrderId(rs.getString("order_id"));
                order.setOrderDate(rs.getTimestamp("order_date"));
                order.setStatus(rs.getString("status"));
                order.setRecipientName(rs.getString("recipient_name"));
                order.setRecipientEmail(rs.getString("recipient_email"));
                order.setStreetAddress(rs.getString("street_address"));
                order.setCity(rs.getString("city"));
                order.setPostalCode(rs.getString("postal_code"));
                order.setTotalAmount(rs.getBigDecimal("total_amount"));

                // Load items for this order
                order.setItems(findItemsForOrder(conn, order.getOrderId()));
                orders.add(order);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "JDBC Error fetching all orders", e);
        }
        return orders;
    }

    private List<OrderItem> findItemsForOrder(Connection conn, String orderId) throws SQLException {
        List<OrderItem> items = new ArrayList<>();
        String sql = "SELECT * FROM order_items WHERE order_id = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, orderId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    OrderItem item = new OrderItem(
                        rs.getString("volume_id"),
                        rs.getString("vol_string"),
                        rs.getString("title"),
                        rs.getString("author"),
                        rs.getBigDecimal("unit_price"),
                        rs.getInt("quantity")
                    );
                    item.setItemId(rs.getInt("item_id"));
                    item.setOrderId(orderId);
                    items.add(item);
                }
            }
        }
        return items;
    }
}
