import {Component, OnInit, Input} from '@angular/core';
import {Book} from "../_models/catalog/book.model";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DeleteItemPromptDialogComponent} from '../delete-item-prompt-dialog/delete-item-prompt-dialog.component';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  @Input() element;

  constructor(public dialog: MatDialog) {
}

  openDialog(): void {
  const dialogRef = this.dialog.open(DeleteItemPromptDialogComponent, 
    {
      width: '250px',
      data: {element: this.element}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log();
  });
  }

  ngOnInit() {
  }

}
