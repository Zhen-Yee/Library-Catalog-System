package com.soen343.server.models;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class CatalogItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    protected long id;

    @Min(0)
    @Column
    protected int qtyInStock;

    @Min(0)
    @Column()
    protected int qtyOnLoan;

    @NotBlank
    @Column(updatable = false)
    protected String title;

    public CatalogItem(String title, int qtyInStock, int qtyOnLoan) {
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