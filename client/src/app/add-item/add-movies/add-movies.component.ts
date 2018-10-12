import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Movie} from "../../_models/catalog/movie.model";

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrls: ['./add-movies.component.css']
})
export class AddMoviesComponent implements OnInit {
  f: FormGroup;
  constructor( private ff: FormBuilder) { }

  ngOnInit() {
    this.f=this.ff.group({
      title: ["", Validators.required],
      director: ["", Validators.required],
      producers: ["", Validators.required],
      actors: ["", Validators.required],
      language: ["", Validators.required],
      subtitles: ["", Validators.required],
      dubs: ["", Validators.required],
      releaseDate: ["", Validators.required],
      runTime: ["", Validators.required]
    });
  }
  addMovie() {

  }

}
