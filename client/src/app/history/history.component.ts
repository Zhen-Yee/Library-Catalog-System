import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }


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
    this.isLoaded=true;
    
  }


}


