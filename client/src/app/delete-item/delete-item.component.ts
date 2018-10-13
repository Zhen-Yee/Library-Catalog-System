import {Component, OnInit, Input} from '@angular/core';
import {Book} from "../_models/catalog/book.model";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {MatSnackBar} from '@angular/material';
import {DeleteItemErrorBoxComponent} from '../delete-item-error-box/delete-item-error-box.component';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  @Input() element;

  constructor(public snackBar: MatSnackBar, private http: HttpClient) {
}

  deleteNumber: number;
  dataArray: CatalogItem[];

  openSnackBar() {
    this.snackBar.openFromComponent(DeleteItemErrorBoxComponent, {
      duration: 2000,
    });
  }

  delete(itemType: CatalogItem){
  if(this.deleteNumber<0 || this.deleteNumber>itemType.qtyInStock){
    this.openSnackBar()
    console.log("ERROR")
  }
  else{
    itemType.qtyInStock = itemType.qtyInStock - this.deleteNumber
    this.http
    .post("http://localhost:8090/deleteItem", itemType)
    .subscribe();
    console.log(itemType.qtyInStock)
  }
  }

  ngOnInit() {
  }

}