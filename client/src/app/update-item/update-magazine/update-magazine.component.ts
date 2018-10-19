import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Magazine } from "../../_models/catalog/magazine.model";

@Component({
    selector: "update-magazine",
    templateUrl: "update-magazine.component.html",
    styleUrls: ["update-magazine.component.scss"]
})
export class UpdateMagazineComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    @Input() magazine;
    constructor(private fb: FormBuilder, private http: HttpClient) {
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
            // maps Magazine object value to the input fields
            this.form.patchValue({ ...this.magazine });
        } else {
            // when user cancels edit, set edit variable back to false
            this.edit = false;
        }

    }

    createForm() {
        this.form = this.fb.group({
            // Magazine formgroup matching a magazine object with validators
            title: ["", Validators.required],
            publisher: ["", Validators.required],
            dateOfPublication: ["", Validators.required],
            language: ["", Validators.required],
            isbn10: ["", Validators.required],
            isbn13: ["", Validators.required],
            qtyInStock: ["", Validators.required],
            qtyOnLoan: ["", Validators.required],
            id: ["", Validators.required]
        });
    }

    // save magazine to later send new Magazine object to update in backend
    saveMagazine() {
        if (this.form.valid) {
            this.magazine = {
                ...this.form.value
            };
            this.edit = false;

            this.http.post<Magazine>("http://localhost:8090/catalog/updateMagazine", this.magazine)
                .subscribe();
        }
    }
}
