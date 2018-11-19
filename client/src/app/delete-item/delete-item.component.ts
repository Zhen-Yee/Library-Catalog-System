import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Book} from "../_models/catalog/book.model";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DeleteItemPromptDialogComponent} from '../delete-item-prompt-dialog/delete-item-prompt-dialog.component';
import {HttpClient} from "@angular/common/http";
import { DataService } from '../_services/DataService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  @Input() element;

  constructor(private http: HttpClient, public dialog: MatDialog, public data: DataService, private router: Router) {
}

  @Output() messageEvent = new EventEmitter<string>();
  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteItemPromptDialogComponent,
      {
        width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(this.element.itemType === CatalogItemType.Book){
          this.http
          .post<CatalogItem>("http://localhost:8090/catalog/deleteBook", this.element)
          .subscribe(updateSuccess => {
            console.log(updateSuccess)
            if (updateSuccess) {
                this.messageEvent.emit("Deleting Book...");
                // Reloads page for updated changes
                // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                this.router.navigate(["/catalog"]);
            } else {
                console.log("Failed to delete Book.")
            }
            this.data.updatedSearchItem = true;
        });
          console.log("Book successfully deleted")
        }

        else if(this.element.itemType === CatalogItemType.Magazine){
          this.http
          .post<CatalogItem>("http://localhost:8090/catalog/deleteMagazine", this.element)
          .subscribe(updateSuccess => {
            console.log(updateSuccess)
            if (updateSuccess) {
                this.messageEvent.emit("Deleting Magazine...")
                this.router.navigate(["/catalog"]);
                // Reloads page for updated changes
                // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                //     this.router.navigate(["/catalog"]));
            } else {
                console.log("Failed to delete Magazine.")
            }
            this.data.updatedSearchItem = true;

        });
          console.log("Magazine successfully deleted")
        }

        else if(this.element.itemType === CatalogItemType.Music){
          this.http
          .post<CatalogItem>("http://localhost:8090/catalog/deleteMusic", this.element)
          .subscribe(updateSuccess => {
            if (updateSuccess) {
                this.messageEvent.emit("Deleting Music...")
                this.router.navigate(["/catalog"]);
                // Reloads page for updated changes
                // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                //     this.router.navigate(["/catalog"]));
            } else {
                console.log("Failed to delete Music.")
            }
            this.data.updatedSearchItem = true;

        });
          console.log("Music successfully deleted")
        }

        else if(this.element.itemType === CatalogItemType.Movie){
          this.http
          .post<CatalogItem>("http://localhost:8090/catalog/deleteMovie", this.element)
          .subscribe(updateSuccess => {
            if (updateSuccess) {
                this.messageEvent.emit("Deleting Movie...")
                this.router.navigate(["/catalog"]);
                // Reloads page for updated changes
                // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                //     this.router.navigate(["/catalog"]));
            } else {
                console.log("Failed to delete Movie.")
            }
            this.data.updatedSearchItem = true;

        });
          console.log("Movie successfully deleted")
        }
      } else {
        console.log("Cancel Delete");
      }
    });
  }

  ngOnInit() {
  }

}
