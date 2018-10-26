import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Magazine } from "../../_models/catalog/magazine.model";
import { Router } from "@angular/router";

@Component({
    selector: "update-magazine",
    templateUrl: "update-magazine.component.html",
    styleUrls: ["update-magazine.component.scss"]
})
export class UpdateMagazineComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    successful;
    @Input() magazine;
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
            delete this.magazine.toString;
            // allows input to change magazine fields
            this.edit = true;
            // maps magazine object value to the input fields
            this.form.patchValue({ ...this.magazine });
        } else {
            // when user cancels edit, set edit variable back to false
            this.edit = false
        }

    }

   createForm() {
        this.form = this.fb.group({
            // magazine formgroup matching a magazine object with validators
            title: ["", Validators.required],
            publisher: ["", Validators.required],
            dateOfPublication: ["", [Validators.required]],
            language: ["", [Validators.required]],
            isbn10: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            isbn13: ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
            qtyInStock: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            qtyOnLoan: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            itemType: ["", Validators.required],
            id: ["", Validators.required],
        });
    }

    // save magazine to later send new Magazine object to update in backend
    saveMagazine(item: Magazine) {
        if (this.form.valid) {
            this.magazine = {
                ...this.form.value
            };
            this.edit = false;

    // creating new Magazine object for updated Magazine to send to backend
    

            // Updates frontend with new saved magazine values
            item.title = this.magazine.title;
            item.qtyInStock = this.magazine.qtyInStock;
            item.itemType = this.magazine.itemType;
            item.qtyOnLoan = this.magazine.qtyOnLoan;
            item.publisher = this.magazine.publisher;
            item.dateOfPublication = this.magazine.dateOfPublication;
            item.language = this.magazine.language;
            item.isbn10 = this.magazine.isbn10;
            item.isbn13 = this.magazine.isbn13;

            this.http.post<Magazine>("http://localhost:8090/catalog/updateMagazine", this.magazine)
                .subscribe(updateSuccess => {
                    if (updateSuccess) {
                        // Reloads page for updated changes to magazine
                        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                            this.router.navigate(["/catalog"]));
                    } else {
                        console.log("Failed to update magazine.")
                    }
                });

            
        }
    }
}
