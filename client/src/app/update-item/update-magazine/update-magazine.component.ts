import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Magazine } from "../../_models/catalog/magazine.model";
import { Router } from "@angular/router";
import { DataService } from "src/app/_services/DataService.service";

@Component({
    selector: "update-magazine",
    templateUrl: "update-magazine.component.html",
    styleUrls: ["update-magazine.component.css"]
})
export class UpdateMagazineComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    savingMessage: string = "Saving Magazine...";
    @Input() magazine;
    constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private data: DataService) {
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
            dateOfPublication: ["", [Validators.required, Validators.pattern("^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})$")]],
            language: ["", Validators.required],
            isbn10: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
            isbn13: ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern("^[0-9]*$")]],
            qtyInStock: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            qtyOnLoan: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            itemType: ["", Validators.required],
            id: ["", Validators.required],
        });
    }

    // save magazine to later send new Magazine object to update in backend
    @Output() messageEvent = new EventEmitter<string>();
    saveMagazine() {
        if (this.form.valid) {
            this.magazine = {
                ...this.form.value
            };
            this.edit = false;

            this.http.post<Magazine>("http://localhost:8090/catalog/updateMagazine", this.magazine)
                .subscribe(updateSuccess => {
                    if (updateSuccess) {
                        this.messageEvent.emit(this.savingMessage);
                        this.data.updatedSearchItem = true;
                        this.router.navigate(["catalog"]);
                        // Reloads page for updated changes to magazine
                        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                        //     this.router.navigate(["/catalog"]));
                    } else {
                        console.log("Failed to update magazine.")
                    }
                });
        }
    }
}
