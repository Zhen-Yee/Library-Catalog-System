import { CatalogItemType } from "./../../enums/catalogItemType";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { CatalogItem } from "../../_models/catalog/catalogItem.model";
import {Magazine} from "../../_models/catalog/magazine.model";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sorting-magazines',
  templateUrl: './sorting-magazines.component.html',
  styleUrls: ['./sorting-magazines.component.css'],
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
  ],
})

export class SortingMagazinesComponent implements OnInit {
  constructor(private http: HttpClient, private user: UserService,private router: Router) {}
  paginator;
  sort;
  isLoaded = false;

    // Generated Data
    dataArray: CatalogItem[] = [];
    columnsToDisplay: string[] = ["title", "qtyInStock", "qtyOnLoan", "language", "publisher", "dateOfPublication", "isbn10", "isbn13"];
    expandedElement: CatalogItem[];
    dataSource: MatTableDataSource<CatalogItem>;
    message: string = "Getting Catalog Items...";

  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator) set paginatorContent(content: ElementRef) {
    this.paginator = content;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
    this.getAll();
  }

  isAdmin() {
    return this.user.isAdmin;
}
  // calls getAll function to refill catalog with updated values
  receiveSaveMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAll();
  }

  receiveDeleteMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAll();
  }

  getAll() {
    this.isLoaded = false;

    this.http
      .get<Magazine[]>("http://localhost:8090/catalog/getAll" + CatalogItemType.Magazine)
      .subscribe(y => {
        y.map(index => { index.itemType = CatalogItemType.Magazine; });
        this.dataArray = [...this.dataArray, ...y];
        this.dataSource = new MatTableDataSource(this.dataArray);
        this.isLoaded = true;
      });
  }

}

