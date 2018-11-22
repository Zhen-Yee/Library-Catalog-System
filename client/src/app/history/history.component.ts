import { UserService } from "../_services/user.service";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  toggling = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private user: UserService ) {
  }

  form: FormGroup;

  // Generated Data
  sort;
  paginator;
  dataArray: any[] = [];
  isLoaded = false;
  columnsToDisplay: string[] = ["id", "userEmail", "itemType", "title", "checkoutDate", "dueDate", "returnDate"];
  dataSource: MatTableDataSource<any>;
  message: string = "Transaction History";


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


