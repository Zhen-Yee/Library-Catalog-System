import { Component, OnInit } from '@angular/core';
import {Book} from "../_models/catalog/book.model";
import {Magazine} from "../_models/catalog/magazine.model";
import {Movie} from "../_models/catalog/movie.model";
import {Music} from "../_models/catalog/music.model";
import {CatalogItem} from "../_models/catalog/catalogItem.model";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  //Generated Data
  dataArray = [];
  columnNames = [];
  columnsToDisplay: string[]= ['title', 'author', 'quantity', 'catalog type'];//{title, author, quantity, catalog_type};
  expandedElement: CatalogItem;

  initialize(){
    this.columnsToDisplay = this.columnsToDisplay;
  }
  ngOnInit() {
    this.initialize();
  }

}
