import { CatalogItemType } from "./../enums/catalogItemType";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Book } from "../_models/catalog/book.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {Item} from "../_models/catalog/item";
import {Observable} from "rxjs";
import {Music} from "../_models/catalog/music.model";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class DataTableComponent implements OnInit {
  constructor(private http: HttpClient) {}

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  // Generated Data
  dataArray: CatalogItem[];
  columnsToDisplay: string[] = ["itemType", "id", "qtyInStock", "qtyOnLoan", "title"];
  expandedElement: CatalogItem[];
  dataSource: MatTableDataSource<CatalogItem>;

  ngOnInit() {
    this.initialize();
    this.dataSource.paginator = this.paginator;
  }

  getAll() {

    let Book  = this.http
      .get<Book[]>("http://localhost:8090/catalog/getAll"+CatalogItemType.Book)
      .subscribe(x => {x.map(index => {index.itemType = CatalogItemType.Book;});
      this.dataArray.concat(x);
      });
    let Music  = this.http
      .get<Music[]>("http://localhost:8090/catalog/getAll"+CatalogItemType.Music)
      .subscribe(x => {x.map(index => {index.itemType = CatalogItemType.Music;});
        this.dataArray.concat(x);
      });

  }

  initialize() {
    this.getAll();
    this.dataSource = new MatTableDataSource(this.dataArray);
  }
}

