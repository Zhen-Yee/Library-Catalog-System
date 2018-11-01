import { Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import { DeleteItemComponent } from "../delete-item/delete-item.component";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {HttpClient} from "@angular/common/http";
import {Music} from "../_models/catalog/music.model";
import { Movie } from "../_models/catalog/movie.model";
import {Book} from "../_models/catalog/book.model";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-item-prompt-dialog',
  templateUrl: './delete-item-prompt-dialog.component.html',
  styleUrls: ['./delete-item-prompt-dialog.component.css']
})
export class DeleteItemPromptDialogComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data) 
    {}

    @Output() messageEvent = new EventEmitter<string>();
    delete(data: CatalogItem){
      if(this.data.element.itemType === CatalogItemType.Book){
        this.http
        .post<CatalogItem>("http://localhost:8090/catalog/deleteBook", this.data.element)
        .subscribe(updateSuccess => {
          console.log(updateSuccess)
          if (updateSuccess) {
              this.messageEvent.emit("Deleting Book...")
              // Reloads page for updated changes
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              //     this.router.navigate(["/catalog"]));
          } else {
              console.log("Failed to delete Book.")
          }
      });
        console.log("Book successfully deleted")
      }

      else if(this.data.element.itemType === CatalogItemType.Magazine){
        this.http
        .post<CatalogItem>("http://localhost:8090/catalog/deleteMagazine", this.data.element)
        .subscribe(updateSuccess => {
          console.log(updateSuccess)
          if (updateSuccess) {
              this.messageEvent.emit("Deleting Magazine...")
              // Reloads page for updated changes
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              //     this.router.navigate(["/catalog"]));
          } else {
              console.log("Failed to delete Magazine.")
          }
      });
        console.log("Magazine successfully deleted")
      }

      else if(this.data.element.itemType === CatalogItemType.Music){
        this.http
        .post<CatalogItem>("http://localhost:8090/catalog/deleteMusic", this.data.element)
        .subscribe(updateSuccess => {
          if (updateSuccess) {
              this.messageEvent.emit("Deleting Music...")
              // Reloads page for updated changes 
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              //     this.router.navigate(["/catalog"]));
          } else {
              console.log("Failed to delete Music.")
          }
      });
        console.log("Music successfully deleted")
      }

      else if(this.data.element.itemType === CatalogItemType.Movie){
        this.http
        .post<CatalogItem>("http://localhost:8090/catalog/deleteMovie", this.data.element)
        .subscribe(updateSuccess => {
          if (updateSuccess) {
              this.messageEvent.emit("Deleting Movie...")
              // Reloads page for updated changes
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              //     this.router.navigate(["/catalog"]));
          } else {
              console.log("Failed to delete Movie.")
          }
      });
        console.log("Movie successfully deleted")
      }
      
    }

  ngOnInit() {
  }

}
