package com.soen343.server.models;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "book")
public class Book extends CatalogItem {

}
