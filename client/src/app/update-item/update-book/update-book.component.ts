import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/models/Example.models';

@Component({
    selector: 'update-book',
    templateUrl: 'update-book.component.html',
    styleUrls: ['update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    @Input() book;
    constructor( private fb: FormBuilder) {

     }

    ngOnInit() {
        // creates form on init
        this.createForm();
    }

    editMode() {
        // deletes toString method to properly map values to form
        delete this.book.toString;
        // allows input to change book fields
        this.edit = true;
        // maps Book object value to the input fields
        this.form.patchValue({...this.book});

    }

    createForm() {
        this.form = this.fb.group({
            // book formgroup matching a book object with validators
              titles: ["", Validators.required],
              author: ["", Validators.required],
              format: ["", Validators.required],
              pages: ["", Validators.required],
              publisher: ["", Validators.required],
              yearOfPublication: ["", Validators.required],
              language: ["", Validators.required],
              isbn10: ["", Validators.required],
              isbn13: ["", Validators.required],
              qtyInStock: ["", Validators.required],
              qtyOnLoan: ["", Validators.required],
              itemType: ["", Validators.required],
              id: ["", Validators.required],
          });
    }

    // save book to later send new Book object to update in backend
    saveBook() {
        if (this.form.valid) {
          this.book = {
           ...this.form.value
          };
          this.edit = false;
          console.log(this.book);
        }
      }
}
