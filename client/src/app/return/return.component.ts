import { UserService } from "../_services/user.service";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar} from '@angular/material';
import { Movie } from "../_models/catalog/movie.model";
import { Music } from "../_models/catalog/music.model";
import { CatalogItem } from "../_models/catalog/catalogItem.model";
import { CatalogItemType } from "./../enums/catalogItemType";
import { Router, NavigationEnd, RoutesRecognized } from "@angular/router";
import { Book } from "../_models/catalog/book.model";
import { ObjectDetailsService } from "src/app/_services/object-details.service";
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
    public snackBar: MatSnackBar,
    private data: DataService,
    private details: ObjectDetailsService,
    private router: Router
  ) {}

  dataArray: any[] = [];
  columnsToDisplay: string[] = [ "title", "itemType", "checkoutDate", "dueDate"];
  dataSource: MatTableDataSource<any>;
  isLoaded = false;
  paginator;
  sort;
  expandedElement: any[];
  form: FormGroup;


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
  
getAllLoanedItems() {
      this.http.post<any[]>("http://localhost:8090/catalog/allLoanedItems", this.user.userEmail).subscribe(x => {
      console.log(x);
      console.log(x[0].catalogItem.title);
      this.dataSource = new MatTableDataSource(x);
      this.isLoaded = true;
  });
}



  returnItem(){

    if(this.element.itemType === CatalogItemType.Book){
      this.http
      .post<any>("http://localhost:8090/catalog/returnBook", this.element)
      .subscribe(updateSuccess => {
        console.log(updateSuccess)
        if (updateSuccess) {
            this.openSnackBar("Book Return Completed!", "Close");
            this.router.navigate(["/"]);
        } else {
            this.openSnackBar("Error with Return", "Close");
            console.log("Failed to return Book.")
        }
    });
    }

    else if(this.element.itemType === CatalogItemType.Movie){
      this.http
      .post<any>("http://localhost:8090/catalog/returnMovie", this.element)
      .subscribe(updateSuccess => {
        console.log(updateSuccess)
        if (updateSuccess) {
            this.openSnackBar("Movie Return Completed!", "Close");
            this.router.navigate(["/"]);
        } else {
            this.openSnackBar("Error with Return", "Close");
            console.log("Failed to return Movie.")
        }
    });
    }

    else if(this.element.itemType === CatalogItemType.Music){
      this.http
      .post<any>("http://localhost:8090/catalog/returnMusic", this.element)
      .subscribe(updateSuccess => {
        console.log(updateSuccess)
        if (updateSuccess) {
            this.openSnackBar("Music Return Completed!", "Close");
            this.router.navigate(["/"]);
        } else {
            this.openSnackBar("Error with Return", "Close");
            console.log("Failed to return Music.")
        }
    });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message , action, {
      duration: 5000,
    });
  }


  ngOnInit() {  
    this.getAllLoanedItems();
  }
}


