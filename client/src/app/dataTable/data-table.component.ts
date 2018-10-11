import {Component, OnInit} from '@angular/core';
import {Book} from "../_models/catalog/book.model";
import {Magazine} from "../_models/catalog/magazine.model";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  //Generated Data
  dataArray: CatalogItem[];
  columnsToDisplay: CatalogItemType[];
  expandedElement: CatalogItem;

  initialize(){
    this.dataArray = [new Book(
      13,13,23,"Hello",CatalogItemType.Book,{
        author: 'james',
        format: "paperback",
        pages: 30,
        publisher:"Steve Shih",
        yearOfPublication: 193,
        language: "english",
        isbn10:"123213",
        isbn13:"2134"}),
      new Magazine(13,13,23,"Hello",CatalogItemType.Magazine,
        {publisher: "Travis", language: "Spanish", dateOfPublication: "August 2012", isbn10: "21321", isbn13: "lol"})] ;

    this.columnsToDisplay = Object.values(CatalogItemType);

  }
  ngOnInit() {
    this.initialize();
  }

}
