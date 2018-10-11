import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'update-magazine',
    templateUrl: 'update-magazine.component.html',
    styleUrls: ['update-magazine.component.scss']
})
export class UpdateMagazineComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    @Input() magazine;
    constructor( private fb: FormBuilder) {

     }

    ngOnInit() {
        // creates form on init
        this.createForm();
    }

    editMode() {
        // deletes toString method to properly map values to form
        delete this.magazine.toString;
        // allows input to change magazine fields
        this.edit = true;
        // maps Magazine object value to the input fields
        this.form.patchValue({...this.magazine});

    }

    createForm() {
        this.form = this.fb.group({
            // Magazine formgroup matching a book object with validators
              titles: ["", Validators.required],
              publisher: ["", Validators.required],
              yearOfPublication: ["", Validators.required],
              language: ["", Validators.required],
              isbn10: ["", Validators.required],
              isbn13: ["", Validators.required],
              qtyInStock: ["", Validators.required],
              qtyOnLoan: ["", Validators.required]
          });
    }

    // save book to later send new Magazine object to update in backend
    saveBook() {
        if (this.form.valid) {
          this.magazine = {
           ...this.form.value
          };
          this.edit = false;
          console.log(this.magazine);
        }
      }
}