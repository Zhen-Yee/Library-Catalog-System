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
    
    ngOnInit() {
    }
}
