import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { CatalogItem } from "../../_models/catalog/catalogItem.model";
import { CatalogItemType } from ".././../enums/catalogItemType";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Book } from "../../_models/catalog/book.model";

@Component({
  selector: 'app-sorting-book',
  templateUrl: './sorting-book.component.html',
  styleUrls: ['./sorting-book.component.css'],
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
export class SortingBookComponent implements OnInit {

  constructor(private http: HttpClient, private user: UserService,private router: Router) { }
  dataArray: CatalogItem[] = [];
  columnsToDisplay: string[] = ["title", "qtyInStock", "qtyOnLoan", "author" , "pages", "yearOfPublication", "publisher", "language"];
  dataSource: MatTableDataSource<CatalogItem>;
  isLoaded = false;
  paginator;
  sort;
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
    this.getAllBook();
  }

  isAdmin() {
    return this.user.isAdmin;
}
  
  receiveSaveMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAllBook();
  }

  receiveDeleteMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAllBook();
  }



  getAllBook(){
    this.http
      .get<Book[]>("http://localhost:8090/catalog/getAll" + CatalogItemType.Book)
      .subscribe(x => {
        x.map(index => { index.itemType = CatalogItemType.Book; });
        this.dataArray = [...this.dataArray, ...x];
        this.dataSource = new MatTableDataSource(this.dataArray);
        this.isLoaded= true;
      });
  }

}
