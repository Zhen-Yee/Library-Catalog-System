import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Music } from "../../_models/catalog/music.model";
import { Router } from "@angular/router";
import { DataService } from "src/app/_services/DataService.service";

@Component({
    selector: "update-music",
    templateUrl: "update-music.component.html",
    styleUrls: ["update-music.component.css"]
})
export class UpdateMusicComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    savingMessage: string = "Saving Music...";
    @Input() music;
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
            delete this.music.toString;
            // allows input to change music fields
            this.edit = true;
            // maps music object value to the input fields
            this.form.patchValue({ ...this.music });
        } else {
            // when user cancels edit, set edit variable back to false
            this.edit = false;
        }

    }

    createForm() {
        this.form = this.fb.group({
            // Magazine formgroup matching a music object with validators
            title: ["", Validators.required],
            type: ["", Validators.required],
            artist: ["", Validators.required],
            releaseDate: ["", [Validators.required, Validators.pattern("^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})$")]],
            asin: ["", [Validators.required, Validators.pattern("^B[\\dA-Z]{9}|\\d{9}(X|\\d)$")]],
            label: ["", Validators.required],
            qtyInStock: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            qtyOnLoan: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
            id: ["", Validators.required]
        });
    }

    // save music to later send new Music object to update in backend
    @Output() messageEvent = new EventEmitter<string>();
    saveMusic(item: Music) {
        if (this.form.valid) {
            this.music = {
                ...this.form.value
            };
            this.edit = false;

            this.http.post<Music>("http://localhost:8090/catalog/updateMusic", this.music)
                .subscribe(updateSuccess => {
                    if (updateSuccess) {
                        this.messageEvent.emit(this.savingMessage);
                        this.data.updatedSearchItem = true;
                        this.router.navigate(["catalog"]);
                        // Reloads page for updated changes to music
                        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                        //     this.router.navigate(["/catalog"]));
                    } else {
                        console.log("Failed to update music.")
                    }
                });


        }
    }
}
