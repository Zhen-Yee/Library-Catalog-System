import { CatalogItemType } from "./../enums/catalogItemType";
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Book } from "../_models/catalog/book.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {Music} from "../_models/catalog/music.model";
import { Movie } from "../_models/catalog/movie.model";
import {Magazine} from "../_models/catalog/magazine.model";

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

  paginator;
  sort;
  isLoaded;

  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort){
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator) set paginatorContent(content: ElementRef) {
    this.paginator = content;
    if (this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
  // Generated Data
  dataArray: CatalogItem[] = [] ;
  columnsToDisplay: string[] = ["itemType", "qtyInStock", "qtyOnLoan", "title"];
  expandedElement: CatalogItem[];
  dataSource: MatTableDataSource<CatalogItem>;

  ngOnInit() {
      this.getAll();
  }

  getAll() {
    this.http
      .get<Book[]>("http://localhost:8090/catalog/getAll"+CatalogItemType.Book)
      .subscribe(x => {x.map(index => {index.itemType = CatalogItemType.Book;});
        this.dataArray = [...this.dataArray,...x];
        this.dataSource = new MatTableDataSource(this.dataArray);
      });
    this.http
      .get<Music[]>("http://localhost:8090/catalog/getAll"+CatalogItemType.Music)
      .subscribe(y => {y.map(index => {index.itemType = CatalogItemType.Music;});
        this.dataArray = [...this.dataArray,...y];
        this.dataSource = new MatTableDataSource(this.dataArray);
      });
    this.http
      .get<Magazine[]>("http://localhost:8090/catalog/getAll"+CatalogItemType.Magazine)
      .subscribe(y => {y.map(index => {index.itemType = CatalogItemType.Magazine; });
        this.dataArray = [...this.dataArray, ...y];
        this.dataSource = new MatTableDataSource(this.dataArray);
      });
    this.http
      .get<Movie[]>("http://localhost:8090/catalog/getAll"+CatalogItemType.Movie)
      .subscribe(y => {y.map(index => {index.itemType = CatalogItemType.Movie; });
        this.dataArray = [...this.dataArray, ...y];
        this.dataSource = new MatTableDataSource(this.dataArray);
        this.isLoaded = true;
      });
  }

}

