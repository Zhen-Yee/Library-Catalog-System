import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Music} from "../../_models/catalog/music.model";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-add-music",
  templateUrl: "./add-music.component.html",
  styleUrls: ["./add-music.component.css"]
})
export class AddMusicComponent implements OnInit {
   Fg: FormGroup;
  constructor(private Form: FormBuilder, private httpClient : HttpClient, public snackBar: MatSnackBar) { }

  ngOnInit() {
     this.Fg = this.Form.group({
        title: ["", Validators.required],
        type: ["", Validators.required],
        artist: ["", Validators.required],
        label: ["", Validators.required],
        releaseDate: ["", [Validators.required, Validators.pattern("^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})$")]],
        asin: ["", Validators.required]
     });
  }

  // addMusic Function
    addmusic() {
       if (this.Fg.valid){
           const music: Music = {
             ...this.Fg.value
           };
           console.log(music);
           this.httpClient.post("http://localhost:8090/catalog/addMusic", music)
           .subscribe((confirmation) => {
            if (confirmation) {
              this.openSnackBar("Music added!", "Close");
              this.Fg.reset();
            } else {
              this.openSnackBar("Error adding music!", "Close");
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
