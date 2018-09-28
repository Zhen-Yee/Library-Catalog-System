package com.soen343.server.models;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class CatalogItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    protected long id;

    @Column
    private String title;

    @Column
    private int qtyInStock;

    @Column
    private int qtyOnLoan;

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
    public void setTitle(String title) {
        this.title = title;
    }

    public void setQtyInStock(int qtyInStock) {
        this.qtyInStock = qtyInStock;
    }

    // Public Methods
    public Boolean checkoutItem() {
        if ( qtyInStock > 0 ) {
            qtyInStock = qtyInStock--;
            qtyOnLoan = qtyOnLoan++;
            return true;
        }
        return false;
    }

    public Boolean returnItem() {
        if (qtyOnLoan > 0) {
            qtyOnLoan = qtyOnLoan--;
            qtyInStock = qtyInStock++;
            return true;
        }
        return false;
    }
}