import { Component, OnInit } from '@angular/core';
import {Book} from "../_models/catalog/book.model";
import {Magazine} from "../_models/catalog/magazine.model";
import {Movie} from "../_models/catalog/movie.model";
import {Music} from "../_models/catalog/music.model";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  //Generated Data
  private dataArray: CatalogItem[] = [];

  generateDataArray(){

  }
  ngOnInit() {
  }

}
