package com.thegroove.service;

import com.thegroove.dao.OrderDAO;
import com.thegroove.model.Order;
import com.thegroove.model.OrderItem;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;

/**
 * Business Service managing the Archival Checkout, Dispatch validation, and Historical Ledger.
 */
public class OrderService {

    private final OrderDAO orderDAO;
    private final VolumeService volumeService;

    public OrderService() {
        this.orderDAO = new OrderDAO();
        this.volumeService = new VolumeService();
    }

    public OrderService(OrderDAO orderDAO, VolumeService volumeService) {
        this.orderDAO = orderDAO;
        this.volumeService = volumeService;
    }

    /**
     * Dispatches an archival order with atomic inventory deduction and validation.
     * @param recipientName Customer Full Name
     * @param recipientEmail Customer Email Address
     * @param streetAddress Delivery Street Address
     * @param city City
     * @param postalCode Postal / ZIP code
     * @param items Ordered items
     * @return Created Order object if successful, null if failed
     */
    public Order dispatchOrder(String recipientName, String recipientEmail, 
                              String streetAddress, String city, String postalCode, 
                              List<OrderItem> items) {
        if (items == null || items.isEmpty()) {
            throw new IllegalArgumentException("Cannot dispatch an empty order.");
        }

        // Verify stock for all items prior to transaction
        for (OrderItem item : items) {
            if (!volumeService.checkInventoryAvailability(item.getVolumeId(), item.getQuantity())) {
                throw new IllegalStateException("Insufficient inventory for edition: " + item.getTitle());
            }
        }

        // Calculate authoritative total
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem item : items) {
            BigDecimal lineTotal = item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(lineTotal);
        }

        // Generate archival order identifier (e.g. GRV-410531)
        String orderId = "GRV-" + (100000 + new Random().nextInt(900000));

        Order order = new Order(orderId, recipientName, recipientEmail, streetAddress, city, postalCode, total);
        for (OrderItem item : items) {
            order.addItem(item);
        }

        // Persist transaction via JDBC DAO
        boolean success = orderDAO.createOrder(order);
        if (success) {
            return order;
        } else {
            throw new RuntimeException("Database error during archival dispatch transaction.");
        }
    }

    /**
     * Retrieves the complete historical dispatch archive ledger.
     * @return List of all past confirmed orders
     */
    public List<Order> getHistoricalOrders() {
        return orderDAO.findAllOrders();
    }
}
