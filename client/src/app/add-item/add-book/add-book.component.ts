import { HttpClient } from "@angular/common/http";
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
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      // book formgroup matching a book object with validators
      title: ["", Validators.required],
      author: ["", Validators.required],
      format: ["", Validators.required],
      pages: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      publisher: ["", Validators.required],
      yearOfPublication: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      language: ["", Validators.required],
      isbn10: ["", Validators.required],
      isbn13: ["", Validators.required]
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
