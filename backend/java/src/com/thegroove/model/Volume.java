package com.thegroove.model;

import java.math.BigDecimal;

public class Volume {
    private String id;
    private int volNum;
    private String volString;
    private String title;
    private String author;
    private BigDecimal price;
    private String category;
    private String spineColor;
    private String accentColor;
    private String foilColor;
    private int publishedYear;
    private String isbn;
    private int stockCount;
    private String synopsis;
    private String clothDescription;
    private String bindingFormat;
    private String paperStock;

    public Volume() {}

    public Volume(String id, int volNum, String volString, String title, String author, 
                  BigDecimal price, String category, String spineColor, String accentColor, 
                  String foilColor, int publishedYear, String isbn, int stockCount, 
                  String synopsis, String clothDescription, String bindingFormat, String paperStock) {
        this.id = id;
        this.volNum = volNum;
        this.volString = volString;
        this.title = title;
        this.author = author;
        this.price = price;
        this.category = category;
        this.spineColor = spineColor;
        this.accentColor = accentColor;
        this.foilColor = foilColor;
        this.publishedYear = publishedYear;
        this.isbn = isbn;
        this.stockCount = stockCount;
        this.synopsis = synopsis;
        this.clothDescription = clothDescription;
        this.bindingFormat = bindingFormat;
        this.paperStock = paperStock;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getVolNum() { return volNum; }
    public void setVolNum(int volNum) { this.volNum = volNum; }

    public String getVolString() { return volString; }
    public void setVolString(String volString) { this.volString = volString; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSpineColor() { return spineColor; }
    public void setSpineColor(String spineColor) { this.spineColor = spineColor; }

    public String getAccentColor() { return accentColor; }
    public void setAccentColor(String accentColor) { this.accentColor = accentColor; }

    public String getFoilColor() { return foilColor; }
    public void setFoilColor(String foilColor) { this.foilColor = foilColor; }

    public int getPublishedYear() { return publishedYear; }
    public void setPublishedYear(int publishedYear) { this.publishedYear = publishedYear; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public int getStockCount() { return stockCount; }
    public void setStockCount(int stockCount) { this.stockCount = stockCount; }

    public String getSynopsis() { return synopsis; }
    public void setSynopsis(String synopsis) { this.synopsis = synopsis; }

    public String getClothDescription() { return clothDescription; }
    public void setClothDescription(String clothDescription) { this.clothDescription = clothDescription; }

    public String getBindingFormat() { return bindingFormat; }
    public void setBindingFormat(String bindingFormat) { this.bindingFormat = bindingFormat; }

    public String getPaperStock() { return paperStock; }
    public void setPaperStock(String paperStock) { this.paperStock = paperStock; }

    @Override
    public String toString() {
        return volString + " - " + title + " by " + author + " ($" + price + ")";
    }
}
