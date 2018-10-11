import { Component, OnInit } from '@angular/core';
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

    // Test book object
    book: Book = {
        name: "ok"
    };

    constructor( private fb: FormBuilder) {

     }

    ngOnInit() {
     
    }

    editMode() {
        // allows input to change book fields
        this.edit = true;
        this.createForm();
        // maps Book object value to the input fields
        this.form.patchValue({...this.book});

    }

    createForm() {
      this.form = this.fb.group({
        // book formgroup matching a book object with validators
          name: ["", Validators.required],
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
