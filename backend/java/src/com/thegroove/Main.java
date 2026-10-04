package com.thegroove.Main;

import com.thegroove.config.DatabaseConnection;
import com.thegroove.dao.OrderDAO;
import com.thegroove.dao.VolumeDAO;
import com.thegroove.model.Order;
import com.thegroove.model.OrderItem;
import com.thegroove.model.Volume;

import java.math.BigDecimal;
import java.sql.Connection;
import java.util.List;

/**
 * Runnable verification application for Java + JDBC + MySQL.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("  THE GROOVE BOOKSTORE - JDBC & MYSQL CONNECTOR  ");
        System.out.println("=================================================");
        System.out.println("JDBC Target URL: " + DatabaseConnection.getJdbcUrl());
        System.out.println("Connecting as:   " + DatabaseConnection.getDbUser());

        try (Connection conn = DatabaseConnection.getConnection()) {
            System.out.println("✓ Successfully established JDBC Connection to MySQL!");
            
            VolumeDAO volumeDAO = new VolumeDAO();
            List<Volume> volumes = volumeDAO.findAll();
            System.out.println("✓ Retrieved " + volumes.size() + " canonical volumes from MySQL.");

            for (Volume v : volumes) {
                System.out.printf("  [%s] %-28s by %-22s - $%.2f (Stock: %d)%n",
                        v.getVolString(), v.getTitle(), v.getAuthor(), v.getPrice(), v.getStockCount());
            }

            OrderDAO orderDAO = new OrderDAO();
            List<Order> orders = orderDAO.findAllOrders();
            System.out.println("✓ Retrieved " + orders.size() + " historical orders from MySQL.");

        } catch (Exception e) {
            System.err.println("Database Connection Note: " + e.getMessage());
            System.err.println("Ensure MySQL server is running on port 3306 and schema.sql has been executed.");
        }
    }
}
