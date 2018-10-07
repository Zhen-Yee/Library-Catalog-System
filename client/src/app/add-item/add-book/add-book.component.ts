import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Book } from "../../_models/catalog/book.model";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"]
})
export class AddBookComponent implements OnInit {
  form: FormGroup;
  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      // book formgroup matching a book object with validators
        title: ["", Validators.required],
        author: ["", Validators.required],
        format: ["", Validators.required],
        pages: ["", Validators.required],
        publisher: ["", Validators.required],
        language: ["", Validators.required],
        isbn10: ["", Validators.required],
        isbn13: ["", Validators.required],
    });
  }

  addBook() {
    if (this.form.valid) {
      // using spread operator to pass the values to the object
      const book: Book = {
       ...this.form.value
      };
      console.log(book);
    }
  }

}
