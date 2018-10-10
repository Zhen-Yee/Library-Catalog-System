import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from "@angular/forms";


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
        artist: ["", Validators.required],
        asin: ["", Validators.required],
        label: ["", Validators.required],
        release_date: ["", Validators.required],
        type: ["", Validators.required]
     });
  }

  //addMusic Function

}
