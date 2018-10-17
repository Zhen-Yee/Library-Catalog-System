import { Component, OnInit, ViewChild} from "@angular/core";
import {Book} from "../_models/catalog/book.model";
import {Magazine} from "../_models/catalog/magazine.model";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSort, MatPaginator, MatTableDataSource} from "@angular/material";
import {Observable} from "rxjs";
import {User} from "../../models/User.models";
import {Item} from "../_models/catalog/item";
import {HttpClient} from "@angular/common/http";
import {switchMap} from "rxjs/operators";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({height: "0px", minHeight: "0", display: "none"})),
      state("expanded", style({height: "*"})),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
})
export class DataTableComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Generated Data
  dataArray: Item[];
  columnsToDisplay: string[] = ["itemType", "id", "qtyInStock", "qtyOnLoan", "title"];
  expandedElement: Item[] ;
  dataSource: MatTableDataSource<Item>;


  ngOnInit() {
    this.initialize();
    this.dataSource.paginator = this.paginator;
  }

  getAll() {
    return this.http.get<Item[]>("http://localhost:8090/catalog/getAll")
      //    .map(x => x.type="x").subscribe(x=> console.log(x));
      .subscribe(item => this.dataArray = item)
      ;
  }

  initialize() {
    this.getAll();
    this.dataSource = new MatTableDataSource(this.dataArray);
  }

}
