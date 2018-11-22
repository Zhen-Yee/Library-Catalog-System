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
    public String itemType;
    public int item_id;

    public Transaction() {}

    public Transaction(String userEmail, CatalogItem catalogItem) {
        this.userEmail = userEmail;
        this.catalogItem = catalogItem;
        this.checkoutDate = new Date(System.currentTimeMillis());
        this.dueDate = generateDueDate(catalogItem, this.checkoutDate);
    }

    public Transaction(String userEmail, String itemType, int item_id, String checkoutDate, String dueDate) {
        this.userEmail = userEmail;
        this.itemType = itemType;
        this.item_id = item_id;
        this.checkoutDate = new Date(checkoutDate);
        this.dueDate = new Date(checkoutDate);
    }

    public Transaction(String userEmail, CatalogItem catalogItem, Date checkoutDate, Date dueDate) {
        this.userEmail = userEmail;
        this.catalogItem = catalogItem;
        this.checkoutDate = checkoutDate;
        this.dueDate = dueDate;
    }

    /**
     * Generates the due date based on item type
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

    public void setId(long id) {
        this.id = id;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setCatalogItem(CatalogItem catalogItem) {
        this.catalogItem = catalogItem;
    }

    public void setCheckoutDate(Date checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public void setDateReturned(Date dateReturned) {
        this.dateReturned = dateReturned;
    }
}
