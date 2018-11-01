import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
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
    savingMessage: string = "Saving Book...";
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
    @Output() messageEvent = new EventEmitter<string>();
    saveBook() {
        if (this.form.valid) {
            this.book = {
                ...this.form.value
            };
            this.edit = false;

            this.http.post<Book>("http://localhost:8090/catalog/updateBook", this.book)
                .subscribe(updateSuccess => {
                    if (updateSuccess) {
                        this.messageEvent.emit(this.savingMessage);
                        // Reloads page for updated changes to book
                        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                        //     this.router.navigate(["/catalog"]));
                    } else {
                        console.log("Failed to update book.");
                    }
                });


        }
    }
}
