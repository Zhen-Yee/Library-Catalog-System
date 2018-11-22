import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { CatalogItem } from "../_models/catalog/catalogItem.model";
import { CatalogItemType } from "./../enums/catalogItemType";
import { UserService } from "../_services/user.service";
import { Router, NavigationEnd, RoutesRecognized } from "@angular/router";
import { Book } from "../_models/catalog/book.model";
import { ObjectDetailsService } from "src/app/_services/object-details.service";
import { filter, pairwise } from "rxjs/operators";
import { DataService } from "src/app/_services/DataService.service";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css'],
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

export class ReturnComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private data: DataService,
    private details: ObjectDetailsService,
    private user: UserService,
    private router: Router
  ) {}
  dataArray: CatalogItem[] = [];
  columnsToDisplay: string[] = [ "title", "checkoutDate", "dueDate"];
  dataSource: MatTableDataSource<CatalogItem>;
  isLoaded = false;
  paginator;
  sort;
  element;
  item;
  expandedElement: CatalogItem[];
  
/*
  @ViewChild(MatSort)
  set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator)
  set paginatorContent(content: ElementRef) {
    this.paginator = content;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
*/

  ngOnInit() {
    this.getAllLoanedItems();
  }

  authenticated() {
    return this.user.authenticated;
  }

  /*
  getAllLoanedItems() {
    this.http
      .get<CatalogItem[]>(
        "http://localhost:8090/catalog/getAllLoanedItems" + CatalogItem
      )
      .subscribe(x => {
        x.map(index => {
          index.id= CatalogItem;
        });
        this.dataArray = [...this.dataArray, ...x];
        this.data.dataFromService = this.dataArray;
        this.dataSource = new MatTableDataSource(this.dataArray);
        this.isLoaded = true;
      });
  }


  getAllLoanedItems() {
      this.isLoaded = false;
    this.http.get("http://localhost:8090/catalog/getAllLoanedItems").subscribe(x => {
      Object.keys(x).map(key => {
        this.data.findType(x[key]);
        this.dataArray = [...this.dataArray, ...x[key]];
      });
      this.dataSource = new MatTableDataSource(this.dataArray);
      this.isLoaded = true;
    });
  }

  */
  

getAllLoanedItems() {
  this.http.post<any[]>("http://localhost:8090/catalog/allLoanedItems", this.user.userEmail).subscribe(x => {
    console.log(x);
    console.log(x[0].catalogItem.title);
    this.dataSource = new MatTableDataSource(x);
    this.isLoaded = true;
  });
}


}


