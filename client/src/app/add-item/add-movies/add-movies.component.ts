import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Movie} from "../../_models/catalog/movie.model";

@Component({
  selector: "app-add-movies",
  templateUrl: "./add-movies.component.html",
  styleUrls: ["./add-movies.component.css"]
})
export class AddMoviesComponent implements OnInit {
  f: FormGroup;
  constructor( private ff: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.f = this.ff.group({
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
    // dummy value used to test if it goes to backend
    const x: Movie = {
      ...this.f.value
    };
    x.title = "FrontTitleTest";
    x.qtyInStock = 5;
    x.qtyOnLoan = 0;
    x.director = "testDirector";
    x.language = "Klingon";
    x.releaseDate = "1973/09/15";
    x.runTime = 90;
    x.actors = ["Actor1", "Actor2", "Actor3"];
    x.dubs = ["Spanish", "French"];
    x.subtitles = ["Hindu", "Greek"];
    x.producers = ["Producer1", "Producer2", "Producer3"];
    this.http.post("http://localhost:8090/catalog/addMovie", x)
    .subscribe((confirmation) => console.log(confirmation));
  }

}
