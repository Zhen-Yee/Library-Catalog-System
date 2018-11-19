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

    // constructor used for mapping, look at Movie default constructor for more info
    protected CatalogItem(){}

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
    public void setId(long id) {
        this.id = id;
    }
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
        if ( this.qtyInStock > 0 ) {
            this.qtyInStock--;
            this.qtyOnLoan++;
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
            this.qtyOnLoan--;
            this.qtyInStock++;
            return true;
        }
        return false;
    }

}
