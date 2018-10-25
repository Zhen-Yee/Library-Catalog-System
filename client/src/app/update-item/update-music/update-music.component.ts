import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Music } from "../../_models/catalog/music.model";
import { Router } from "@angular/router";

@Component({
    selector: "update-music",
    templateUrl: "update-music.component.html",
    styleUrls: ["update-music.component.scss"]
})
export class UpdateMusicComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    confirmation; // used later to display if book was added sucessfully
    @Input() music;
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
            releaseDate: ["", [Validators.required, Validators.pattern("^([0-9]{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$")]],
            asin: ["", [Validators.required, Validators.pattern("^B[\\dA-Z]{9}|\\d{9}(X|\\d)$")]],
            label: ["", Validators.required],
            qtyInStock: ["", Validators.required],
            qtyOnLoan: ["", Validators.required],
            id: ["", Validators.required]
        });
    }

    // save music to later send new Music object to update in backend
    saveMusic(item: Music) {
        if (this.form.valid) {
            this.music = {
                ...this.form.value
            };
            this.edit = false;

            // Updates frontend with new saved values
            item.title = this.music.title;
            item.qtyInStock = this.music.qtyInStock;
            item.type = this.music.type;
            item.qtyOnLoan = this.music.qtyOnLoan;
            item.artist = this.music.artist;
            item.releaseDate = this.music.releaseDate;
            item.asin = this.music.asin;
            item.label = this.music.label;

            this.http.post<Music>("http://localhost:8090/catalog/updateMusic", this.music)
                .subscribe(updateSuccess => {
                    if (updateSuccess) {
                        // Reloads page for updated changes to music
                        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                            this.router.navigate(["/catalog"]));
                    } else {
                        console.log("Failed to update music.")
                    }
                });


        }
    }
}
