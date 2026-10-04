package com.thegroove.model;

import java.math.BigDecimal;

public class OrderItem {
    private int itemId;
    private String orderId;
    private String volumeId;
    private String volString;
    private String title;
    private String author;
    private BigDecimal unitPrice;
    private int quantity;

    public OrderItem() {}

    public OrderItem(String volumeId, String volString, String title, String author, BigDecimal unitPrice, int quantity) {
        this.volumeId = volumeId;
        this.volString = volString;
        this.title = title;
        this.author = author;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    public int getItemId() { return itemId; }
    public void setItemId(int itemId) { this.itemId = itemId; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getVolumeId() { return volumeId; }
    public void setVolumeId(String volumeId) { this.volumeId = volumeId; }

    public String getVolString() { return volString; }
    public void setVolString(String volString) { this.volString = volString; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
