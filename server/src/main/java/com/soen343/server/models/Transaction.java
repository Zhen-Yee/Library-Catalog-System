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
    public String checkoutDbDate;
    public String dueDbDate;
    public String returnedDbDate;


    public Transaction() {}

    public Transaction(String userEmail, CatalogItem catalogItem) {
        this.userEmail = userEmail;
        this.catalogItem = catalogItem;
        this.checkoutDate = new Date(System.currentTimeMillis());
        this.dueDate = generateDueDate(catalogItem, this.checkoutDate);
    }

    public Transaction(long id, String userEmail, String itemType, int item_id, String checkoutDate, String dueDate, String returned_date) {
        this.id = id;
        this.userEmail = userEmail;
        this.itemType = itemType;
        this.item_id = item_id;
        this.checkoutDbDate = checkoutDate;
        this.dueDbDate = dueDate;
        this.returnedDbDate = returned_date;
    }

    public Transaction(String userEmail, CatalogItem catalogItem, String itemType, String checkoutDate, String dueDate, String returned_date) {
        this.userEmail = userEmail;
        this.catalogItem = catalogItem;
        this.checkoutDbDate = checkoutDate;
        this.dueDbDate = dueDate;
        this.itemType = itemType;
        this.returnedDbDate = returned_date;
    }

    public Transaction(Transaction transaction, CatalogItem catalogItem) {
        this.id = transaction.id;
        this.item_id = (int) catalogItem.getId();
        this.userEmail = transaction.userEmail;
        this.itemType = transaction.itemType;
        this.checkoutDbDate = transaction.checkoutDbDate;
        this.dueDbDate = transaction.dueDbDate;
        this.catalogItem = catalogItem;
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
