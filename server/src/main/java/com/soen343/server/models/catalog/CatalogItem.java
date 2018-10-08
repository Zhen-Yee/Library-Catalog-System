package com.soen343.server.models.catalog;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public abstract class CatalogItem {

    protected long id;

    @Min(0)
    protected int qtyInStock;

    @Min(0)
    protected int qtyOnLoan;

    @NotBlank
    protected String title;

    protected CatalogItem(String title, int qtyInStock, int qtyOnLoan) {
        this.title = title;
        this.qtyInStock = qtyInStock;
        this.qtyOnLoan = qtyOnLoan;
    }

    // Accessors
    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getQtyInStock() {
        return qtyInStock;
    }

    public int getQtyOnLoan() {
        return qtyOnLoan;
    }

    // Mutators
    public void setQtyInStock(int qtyInStock) {
        this.qtyInStock = qtyInStock;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Decrements the quantity in stock by 1 while incrementing the quantity in loan
     * @return Boolean that indicates if the checkout succeeded
     */
    public Boolean checkoutItem() {
        if ( qtyInStock > 0 ) {
            qtyInStock = qtyInStock--;
            qtyOnLoan = qtyOnLoan++;
            return true;
        }
        return false;
    }

    /**
     * Increments the quantity in stock by 1 while decrementing the quantity on loan
     * @return Boolean that indicates if the return succeeded
     */
    public Boolean returnItem() {
        if (qtyOnLoan > 0) {
            qtyOnLoan = qtyOnLoan--;
            qtyInStock = qtyInStock++;
            return true;
        }
        return false;
    }

}
