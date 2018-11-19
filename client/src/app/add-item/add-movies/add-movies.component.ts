import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {MatChipInputEvent} from "@angular/material";
import {Movie} from "../../_models/catalog/movie.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-add-movies",
  templateUrl: "./add-movies.component.html",
  styleUrls: ["./add-movies.component.css"]
})
export class AddMoviesComponent implements OnInit {
  // input chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  producers: Array<string> = [];
  actors: Array<string> = [];
  subtitles: Array<string> = [];
  dubs: Array<string> = [];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ["", Validators.required],
      director: ["", Validators.required],
      // producers: [this.producers],
      // actors: [this.actors],
      language: ["", Validators.required],
      // subtitles: [this.subtitles],
      // dubs: [this.dubs],
      releaseDate: ["", [Validators.required, Validators.pattern("^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})$")]],
      runTime: ["", Validators.required]
    });
  }

  // producer, actor, subtitle, dub control
  addProducer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.producers.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeProducer(producer: string): void {
    const index = this.producers.indexOf(producer);

    if (index >= 0) {
      this.producers.splice(index, 1);
    }
  }

  addActor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.actors.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeActor(actor: string): void {
    const index = this.actors.indexOf(actor);

    if (index >= 0) {
      this.actors.splice(index, 1);
    }
  }

  addSubtitle(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.subtitles.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeSubtitle(sub: string): void {
    const index = this.subtitles.indexOf(sub);

    if (index >= 0) {
      this.subtitles.splice(index, 1);
    }
  }

  addDub(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.dubs.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeDub(dub: string) {
    const index = this.dubs.indexOf(dub);

    if (index >= 0) {
      this.dubs.splice(index, 1);
    }
  }

  addMovie() {
    if (this.form.valid) {
      const movie: Movie = {
        ...this.form.value
      };
      // requires validation to check that producers/actors/subtitles/dubs are not empty
      movie.producers = this.producers;
      movie.actors = this.actors;
      movie.subtitles = this.subtitles;
      movie.dubs = this.dubs;
      console.log(movie);

      this.http.post("http://localhost:8090/catalog/addMovie", movie)
        .subscribe((confirmation) => {
          if (confirmation) {
            this.openSnackBar("Movie added!", "Close");
          } else {
            this.openSnackBar("Error adding movie!", "Close");
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
