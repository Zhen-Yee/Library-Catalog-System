import {AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Book} from "../_models/catalog/book.model";
import {Magazine} from "../_models/catalog/magazine.model";
import {Music} from "../_models/catalog/music.model";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataTableComponent implements OnInit {

  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Generated Data
  dataArray: CatalogItem[];
  columnsToDisplay: string[]= ['itemType', 'title', 'qtyInStock', 'qtyInLoan', 'titles'];
  expandedElement: CatalogItem;
  dataSource: MatTableDataSource<CatalogItem>;


  ngOnInit() {
    this.initialize();
    this.dataSource.paginator = this.paginator;
  }

  initialize() {
    this.dataArray = [
      new Book(CatalogItemType.Book, 13, 11, 3, "Hello", {
        author: 'james',
        format: "paperback",
        pages: 30,
        publisher: "Steve Shih",
        yearOfPublication: 193,
        language: "english",
        isbn10: "123213",
        isbn13: "2134"
      }),
      new Magazine(CatalogItemType.Magazine, 5, 6, 12, "Hello", {
        publisher: "Travis", 
        language: "Spanish", 
        dateOfPublication: "08/2012", 
        isbn10: "21321", 
        isbn13: "lol"
      }),
      new Music(CatalogItemType.Music, 2, 4, 9, "Hello",{
        artist: 'jb',
        label: 'ok',
        releaseDate: '12/23',
        asin: 'ok'
      }),];
    this.dataSource = new MatTableDataSource(this.dataArray);
  }

}
