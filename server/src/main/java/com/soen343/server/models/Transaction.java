package com.soen343.server.models;

import com.soen343.server.models.catalog.Book;
import com.soen343.server.models.catalog.CatalogItem;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Calendar;

@Component
public class Transaction {

    private final int BOOK_LOAN_LENGTH = 7;
    private final int MEDIA_LOAN_LENGTH = 2;

    private long id;
    private String userEmail;
    private CatalogItem catalogItem;
    private Date checkoutDate;
    private Date dueDate;
    private Date dateReturned;

    public Transaction() {}

    public Transaction(String userEmail, CatalogItem catalogItem) {
        this.userEmail = userEmail;
        this.catalogItem = catalogItem;
        this.checkoutDate = new Date(System.currentTimeMillis());
        this.dueDate = generateDueDate(catalogItem, this.checkoutDate);
    }

    /**
     * Generates the due date based on the due date; loan length is parsed from "file_name"
     * @return the date + maximum loan length of the specified item type.
     */
    public Date generateDueDate(CatalogItem catalogItem, Date checkoutDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(checkoutDate);

        if (catalogItem.getClass() == Book.class) {
            calendar.add(Calendar.DAY_OF_YEAR, BOOK_LOAN_LENGTH);
            return calendar.getTime();
        } else {
            calendar.add(Calendar.DAY_OF_YEAR, MEDIA_LOAN_LENGTH);
            return calendar.getTime();
        }
    }

    public int getBOOK_LOAN_LENGTH() {
        return BOOK_LOAN_LENGTH;
    }

    public int getMEDIA_LOAN_LENGTH() {
        return MEDIA_LOAN_LENGTH;
    }

    public long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public CatalogItem getCatalogItem() {
        return catalogItem;
    }

    public Date getCheckoutDate() {
        return checkoutDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public Date getDateReturned() {
        return dateReturned;
    }
}
