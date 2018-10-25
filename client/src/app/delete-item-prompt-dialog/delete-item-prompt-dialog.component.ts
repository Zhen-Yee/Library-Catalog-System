import { Component, OnInit, Input, Inject} from '@angular/core';
import { DeleteItemComponent } from "../delete-item/delete-item.component";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {HttpClient} from "@angular/common/http";
import {Music} from "../_models/catalog/music.model";
import { Movie } from "../_models/catalog/movie.model";
import {Book} from "../_models/catalog/book.model";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-item-prompt-dialog',
  templateUrl: './delete-item-prompt-dialog.component.html',
  styleUrls: ['./delete-item-prompt-dialog.component.css']
})
export class DeleteItemPromptDialogComponent implements OnInit {

  constructor(private http: HttpClient, 
    @Inject(MAT_DIALOG_DATA) public data) 
    {}

    delete(data: CatalogItem){
      if(this.data.element.itemType === CatalogItemType.Book){
        this.http
        .post<CatalogItem>("http://localhost:8090/catalog/deleteBook", this.data.element)
        .subscribe(confirmation => console.log());
        console.log("Item successfully deleted")
      }
      else if(this.data.element.itemType === CatalogItemType.Magazine){
        this.http
        .post<CatalogItem>("http://localhost:8090/catalog/deleteMagazine", this.data.element)
        .subscribe(confirmation => console.log());
        console.log("Item successfully deleted")
      }
      else if(this.data.element.itemType === CatalogItemType.Music){
        this.http
        .post<CatalogItem>("http://localhost:8090/catalog/deleteMusic", this.data.element)
        .subscribe(confirmation => console.log());
        console.log("Item successfully deleted")
      }
    }

  ngOnInit() {
  }

}
