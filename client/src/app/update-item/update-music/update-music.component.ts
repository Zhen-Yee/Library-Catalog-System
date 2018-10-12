import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Music } from "../../_models/catalog/music.model";

@Component({
    selector: "update-music",
    templateUrl: "update-music.component.html",
    styleUrls: ["update-music.component.scss"]
})
export class UpdateMusicComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    @Input() music;
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
            releaseDate: ["", Validators.required],
            asin: ["", Validators.required],
            label: ["", Validators.required],
            qtyInStock: ["", Validators.required],
            qtyOnLoan: ["", Validators.required]
        });
    }

    // save music to later send new Music object to update in backend
    saveMusic() {
        if (this.form.valid) {
            this.music = {
                ...this.form.value
            };
            this.edit = false;
            const updatedMusic = new Music(
                this.music.itemType, this.music.id, this.music.qtyInStock, this.music.qtyOnLoan, this.music.title, {
                    type: this.music.type,
                    artist: this.music.artist,
                    label: this.music.label,
                    releaseDate: this.music.releaseDate,
                    asin: this.music.asin
                })
            this.http.post<Music>("http://localhost:8090/catalog/updateMusic", updatedMusic)
                .subscribe();
        }
    }
}
