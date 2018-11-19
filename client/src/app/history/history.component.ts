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


  createForm() {
    console.log("enter Search");
    this.form = this.fb.group({
      id: ["", Validators.required],
      userEmail: ["", Validators.required],
      CatalogItem: ["", Validators.required],
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



// Generated Data

sort;
paginator;

  dataArray = [];
  isLoaded = false;
  columnsToDisplay: string[] = ["id", "userEmail", "catalogItem", "checkoutDate", "dueDate", "returnDate"];
  dataSource: MatTableDataSource<any>;
  message: string = "Transaction History";

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
      
      this.http.get("http://localhost:8090/catalog/allTransactions").subscribe();

    } else {

      this.http.post("http://localhost:8090/catalog/userTransactions", this.user.userEmail).subscribe();

    }
    this.isLoaded=true;
    
  }


}


