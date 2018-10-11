import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {MusicModel} from "../../_models/catalog/music.model";

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.css']
})
export class AddMusicComponent implements OnInit {
   Fg: FormGroup
  constructor(private Form :FormBuilder) { }

  ngOnInit() {
     this.Fg = this.Form.group({
        title: ["", Validators.required],
        type: ["", Validators.required],
        artist: ["", Validators.required],
        label: ["", Validators.required],
        releaseDate: ["", Validators.required],
        asin: ["", Validators.required]
     });
  }

  //addMusic Function
    addmusic(){
       if (this.Fg.valid){
           const Music: MusicModel ={
             ...this.Fg.value
           };
           console.log(Music);
       }
    }
}
