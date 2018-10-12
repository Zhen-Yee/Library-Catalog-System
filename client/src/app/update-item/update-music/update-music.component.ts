import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "update-music",
    templateUrl: "update-music.component.html",
    styleUrls: ["update-music.component.scss"]
})
export class UpdateMusicComponent implements OnInit {
    form: FormGroup;
    edit: boolean;
    @Input() music;
    constructor( private fb: FormBuilder) {

     }

    ngOnInit() {
        // creates form on init
        this.createForm();
        this.edit = false;
    }

    editMode() {
        // deletes toString method to properly map values to form
        delete this.music.toString;
        // allows input to change music fields
        this.edit = true;
        // maps music object value to the input fields
        this.form.patchValue({...this.music});

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
          console.log(this.music);
        }
      }
}
