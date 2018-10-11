package com.soen343.server;

import com.soen343.server.models.catalog.CatalogItem;

import java.util.ArrayList;

public class Catalog {

    private static Catalog catalog = null;

    private ArrayList<CatalogItem> catalogItems;

    private Catalog() {
        catalogItems = new ArrayList<>();
    }

    public static Catalog getCatalog() {
        if (catalog == null) {
            catalog = new Catalog();
        }

        return catalog;
    }

    public void addCatalogItem(CatalogItem catalogItem) {
        this.catalogItems.add(catalogItem);
    }

    public ArrayList<CatalogItem> getAllCatalogItems() {
        return catalogItems;
    }
}
