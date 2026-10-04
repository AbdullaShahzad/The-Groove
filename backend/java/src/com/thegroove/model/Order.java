package com.thegroove.model;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class Order {
    private String orderId;
    private Timestamp orderDate;
    private String status;
    private String recipientName;
    private String recipientEmail;
    private String streetAddress;
    private String city;
    private String postalCode;
    private BigDecimal totalAmount;
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

    public Order(String orderId, String recipientName, String recipientEmail, 
                 String streetAddress, String city, String postalCode, BigDecimal totalAmount) {
        this.orderId = orderId;
        this.recipientName = recipientName;
        this.recipientEmail = recipientEmail;
        this.streetAddress = streetAddress;
        this.city = city;
        this.postalCode = postalCode;
        this.totalAmount = totalAmount;
        this.status = "CONFIRMED";
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public Timestamp getOrderDate() { return orderDate; }
    public void setOrderDate(Timestamp orderDate) { this.orderDate = orderDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRecipientName() { return recipientName; }
    public void setRecipientName(String recipientName) { this.recipientName = recipientName; }

    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }

    public String getStreetAddress() { return streetAddress; }
    public void setStreetAddress(String streetAddress) { this.streetAddress = streetAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
    public void addItem(OrderItem item) { this.items.add(item); }
}
