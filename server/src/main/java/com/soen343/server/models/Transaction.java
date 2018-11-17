package com.soen343.server.models;

import com.soen343.server.models.catalog.CatalogItem;

import java.sql.Date;

public class Transaction {

    private long id;
    private String userEmail;
    private CatalogItem catalogItem;
    private Date checkoutDate;
    private Date dueDate;
    private Date returnDate;

    public Transaction(String userEmail, CatalogItem catalogItem) {
        this.userEmail = userEmail;
        this.catalogItem = catalogItem;
        this.checkoutDate = new Date(System.currentTimeMillis());

    }

    private setDueDate(CatalogItem item) {

    }
}
