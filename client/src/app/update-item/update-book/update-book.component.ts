import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Book } from "../../_models/catalog/book.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


@Component({
    selector: "update-book",
    templateUrl: "update-book.component.html",
    styleUrls: ["update-book.component.scss"]
})
export class UpdateBookComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    successful;
    @Input() book;
    constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {

    }

    ngOnInit() {
        // creates form on init
        this.createForm();
        this.edit = false;
    }

    editMode() {
        if (this.edit === false) {
            // deletes toString method to properly map values to form
            delete this.book.toString;
            // allows input to change book fields
            this.edit = true;
            // maps Book object value to the input fields
            this.form.patchValue({ ...this.book });
        } else {
            // when user cancels edit, set edit variable back to false
            this.edit = false
        }

    }

   createForm() {
        this.form = this.fb.group({
            // book formgroup matching a book object with validators
            title: ["", Validators.required],
            author: ["", Validators.required],
            format: ["", [Validators.required, Validators.pattern("^Paperback$|^Hardcover$")]],
            pages: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            publisher: ["", [Validators.required]],
            yearOfPublication: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            language: ["", [Validators.required]],
            isbn10: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            isbn13: ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
            qtyInStock: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            qtyOnLoan: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            itemType: ["", Validators.required],
            id: ["", Validators.required],
        });
    }

    // save book to later send new Book object to update in backend
    saveBook(item: Book) {
        if (this.form.valid) {
            this.book = {
                ...this.form.value
            };
            this.edit = false;

            console.log(this.book);

            // creating new Book object for updated Book to send to backend
            const updatedBook = new Book(
                this.book.itemType,
                this.book.id,
                this.book.qtyInStock,
                this.book.qtyOnLoan,
                this.book.title, {
                    author: this.book.author,
                    format: this.book.format,
                    pages: this.book.pages,
                    publisher: this.book.publisher,
                    yearOfPublication: this.book.yearOfPublication,
                    language: this.book.language,
                    isbn10: this.book.isbn10,
                    isbn13: this.book.isbn13
                });

                console.log(updatedBook);


            // Updates frontend with new saved book values
            item.title = this.book.title;
            item.qtyInStock = this.book.qtyInStock;
            item.itemType = this.book.itemType;
            item.qtyOnLoan = this.book.qtyOnLoan;
            item.author = this.book.author;
            item.format = this.book.format;
            item.pages = this.book.pages;
            item.publisher = this.book.publisher;
            item.yearOfPublication = this.book.yearOfPublication;
            item.language = this.book.language;
            item.isbn10 = this.book.isbn10;
            item.isbn13 = this.book.isbn13;

            this.http.post<Book>("http://localhost:8090/catalog/updateBook", this.book)
            .subscribe( answer => {this.successful = answer; });
        }
    }
}
