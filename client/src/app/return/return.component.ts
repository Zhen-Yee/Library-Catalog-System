import { UserService } from "../_services/user.service";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


import { Movie } from "../_models/catalog/movie.model";
import { Music } from "../_models/catalog/music.model";
import { CatalogItem } from "../_models/catalog/catalogItem.model";
import { CatalogItemType } from "./../enums/catalogItemType";
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

  toggling = false;

  @Input()
  element;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private user: UserService,

    private data: DataService,
    private details: ObjectDetailsService,
    private router: Router
  ) {
  }

  form: FormGroup;

  // Generated Data
  sort;
  paginator;
  dataArray: any[] = [];
  isLoaded = false;
  columnsToDisplay: string[] = ["id", "userEmail", "itemType", "title", "checkoutDate", "dueDate", "returnDate"];
  dataSource: MatTableDataSource<any>;
  expandedElement: any[];


  createForm() {
    console.log("enter Search");
    this.form = this.fb.group({
      id: ["", Validators.required],
      userEmail: ["", Validators.required],
      CatalogItem: ["", Validators.required],
      title: ["", Validators.required],
      checkOutDate: ["", Validators.required],
      dueDate: ["", Validators.required],
      returnDate: ["", Validators.required],
    });
  }

  createAdminForm() {
    console.log("enter Search");
    this.form = this.fb.group({
      dubs: ["", Validators.required],
      releaseDate: ["", Validators.required],
    });
  }

  isAdmin() {
    return this.user.isAdmin;
  }

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
  this.http.post<CatalogItem[]>("http://localhost:8090/catalog/getAllLoanedItems", this.user.userEmail).subscribe(x => {
    console.log(x);
    console.log(x[0].title);
    this.dataSource = new MatTableDataSource(x);
    this.isLoaded = true;
  });
}

  returnItem(){
    if(this.element.itemType === CatalogItemType.Book){
      this.http
      .post<CatalogItem>("http://localhost:8090/catalog/returnBook", this.element)
      .subscribe(updateSuccess => {
        console.log(updateSuccess)
        if (updateSuccess) {
            this.router.navigate(["/"]);
        } else {
            console.log("Failed to return Book.")
        }
        this.data.updatedSearchItem = true;
    });
      console.log("Book successfully returned")
    }

    else if(this.element.itemType === CatalogItemType.Movie){
      this.http
      .post<CatalogItem>("http://localhost:8090/catalog/returnMovie", this.element)
      .subscribe(updateSuccess => {
        console.log(updateSuccess)
        if (updateSuccess) {
            this.router.navigate(["/"]);
        } else {
            console.log("Failed to return Movie.")
        }
        this.data.updatedSearchItem = true;
    });
      console.log("Movie successfully returned")
    }

    else if(this.element.itemType === CatalogItemType.Magazine){
      this.http
      .post<CatalogItem>("http://localhost:8090/catalog/returnMusic", this.element)
      .subscribe(updateSuccess => {
        console.log(updateSuccess)
        if (updateSuccess) {
            this.router.navigate(["/"]);
        } else {
            console.log("Failed to return Music.")
        }
        this.data.updatedSearchItem = true;
    });
      console.log("Music successfully returned")
    }
  }


  ngOnInit() {

    this.createForm();
    if (this.user.isAdmin) {
      
      this.http.get<any[]>("http://localhost:8090/catalog/allTransactions").subscribe(x => {
      console.log(x);
      console.log(x[0].catalogItem.title);
      this.dataSource = new MatTableDataSource(x);
      this.isLoaded = true;
    });
    } else {

      this.http.post<any[]>("http://localhost:8090/catalog/userTransactions", this.user.userEmail).subscribe(x => {
      console.log(x);
      console.log(x[0].catalogItem.title);
      this.dataSource = new MatTableDataSource(x);
      this.isLoaded = true;
    });

    }
    //this.isLoaded=true;
    
  }


}


