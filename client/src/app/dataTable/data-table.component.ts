import {Component, OnInit} from '@angular/core';
import {Book} from "../_models/catalog/book.model";
import {Magazine} from "../_models/catalog/magazine.model";
import {CatalogItemType} from "../enums/catalogItemType";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataTableComponent implements OnInit {

  constructor( private fb: FormBuilder) {

  }

  //Generated Data
  dataArray: CatalogItem[];
  columnsToDisplay: string[] = ['itemType', 'id', 'qtyInStock', 'qtyInLoan', 'titles'];
  expandedElement: CatalogItem;
  form: FormGroup;
  edit: boolean;

  initialize() {
    this.dataArray = [new Book(
      CatalogItemType.Book,13, 13, 23, "Hello", {
        author: 'james',
        format: "paperback",
        pages: 30,
        publisher: "Steve Shih",
        yearOfPublication: 193,
        language: "english",
        isbn10: "123213",
        isbn13: "2134"
      }),
      new Magazine(CatalogItemType.Magazine,13, 13, 23, "Hello",
        {publisher: "Travis", language: "Spanish", dateOfPublication: "August 2012", isbn10: "21321", isbn13: "lol"})];
  }

  ngOnInit() {
    this.initialize();
    this.createForm();
  }

  editMode() {
    // allows input to change book fields
    this.edit = true;
    // maps Book object value to the input fields
    this.form.patchValue({...this.dataArray[0]});

  }
  createForm() {
    this.form = this.fb.group({
      // book formgroup matching a book object with validators
        name: ["", Validators.required],
    });
  }

  // save book to later send new Book object to update in backend
  saveBook() {
      // if (this.form.valid) {
      //   this.dataArray[0] = {
      //    ...this.form.value
      //   };
      //   this.edit = false;
      //   console.log(this.dataArray[0]);
      // }
    }

}
