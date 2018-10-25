import { Component, OnInit, Input } from '@angular/core';
import { DeleteItemComponent } from "../delete-item/delete-item.component";

import {Book} from "../_models/catalog/book.model";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-delete-item-prompt-dialog',
  templateUrl: './delete-item-prompt-dialog.component.html',
  styleUrls: ['./delete-item-prompt-dialog.component.css']
})
export class DeleteItemPromptDialogComponent implements OnInit {

  @Input() element;

  constructor(private http: HttpClient) {}

  delete(element: CatalogItem){
    if(element.itemType === CatalogItemType.Book){
      this.http
      .post<CatalogItem>("http://localhost:8090/catalog/deleteBook", element)
      .subscribe(confirmation => console.log());
      console.log("Item successfully deleted")
    }
    else if(element.itemType === CatalogItemType.Magazine){
      this.http
      .post<CatalogItem>("http://localhost:8090/catalog/deleteMagazine", element)
      .subscribe(confirmation => console.log());
      console.log("Item successfully deleted")
    }
    else if(element.itemType === CatalogItemType.Music){
      this.http
      .post<CatalogItem>("http://localhost:8090/catalog/deleteMusic", element)
      .subscribe(confirmation => console.log());
      console.log("Item successfully deleted")
    }
  }

  ngOnInit() {
  }

}
