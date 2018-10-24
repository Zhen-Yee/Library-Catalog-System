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

  constructor(private http: HttpClient) {
}
 
  delete(element: CatalogItem){
  if(element.itemType === CatalogItemType.Book){
    this.http
    .post<CatalogItem>("http://localhost:8090/catalog/deleteBook", element)
    .subscribe(confirmation => console.log(confirmation));
    console.log(element)
  }
  else if(element.itemType === CatalogItemType.Magazine){
    this.http
    .post<CatalogItem>("http://localhost:8090/catalog/deleteMagazine", element)
    .subscribe(confirmation => console.log(confirmation));
    console.log(element)
  }
  else if(element.itemType === CatalogItemType.Music)
    this.http
    .post<CatalogItem>("http://localhost:8090/catalog/deleteMusic", element)
    .subscribe(confirmation => console.log(confirmation));
    console.log(element)
  }

  ngOnInit() {
  }

}
