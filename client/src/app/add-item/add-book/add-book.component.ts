import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Book } from "../../_models/catalog/book.model";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"]
})
export class AddBookComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      // book formgroup matching a book object with validators
            title: ["", Validators.required],
            author: ["", Validators.required],
            format: ["", [Validators.required, Validators.pattern("^Paperback$|^Hardcover$")]],
            pages: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            publisher: ["", [Validators.required]],
            yearOfPublication: ["", [Validators.required, Validators.pattern("^([0-9]{4})$")]],
            language: ["", [Validators.required]],
            isbn10: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
            isbn13: ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern("^[0-9]*$")]]
    });
  }

  addBook() {
    if (this.form.valid) {
      // using spread operator to pass the values to the object
      const book: Book = {
       ...this.form.value
      } as Book;
      console.log(book);
      this.http.post("http://localhost:8090/catalog/addBook", book)
        .subscribe((confirmation) => {
          if (confirmation) {
            this.openSnackBar("Book added!", "Close");
          } else {
            this.openSnackBar("Error adding book!", "Close");
          }
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message , action, {
      duration: 5000,
    });
  }
}
