import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material";
import { Movie } from "../../_models/catalog/movie.model";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Router } from "@angular/router";

@Component({
  selector: "update-movie",
  templateUrl: "./update-movie.component.html",
  styleUrls: ["./update-movie.component.css"]
})
export class UpdateMovieComponent implements OnInit {
  // input chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  edit: boolean;
  id: number;
  producers: Array<string> = [];
  actors: Array<string> = [];
  subtitles: Array<string> = [];
  dubs: Array<string> = [];
  @Input()
  movie;
  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.edit = false;
    this.form = this.formBuilder.group({
      id: ["", Validators.required],
      title: ["", Validators.required],
      qtyInStock: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      qtyOnLoan: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      director: ["", Validators.required],
      language: ["", Validators.required],
      releaseDate: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^([0-9]{4})\\/(0[1-9]|1[0-2])\\/(0[1-9]|[1-2][0-9]|3[0-1])$"
          )
        ]
      ],
      runTime: ["", Validators.required]
    });
  }

  editMode() {
    if (this.edit === false) {
      // deletes toString method to properly map values to form
      delete this.movie.toString;
      // allows input to change book fields
      this.edit = true;
      // maps Book object value to the input fields
      this.form.patchValue({ ...this.movie });
      this.producers = this.movie.producers;
      this.actors = this.movie.actors;
      this.subtitles = this.movie.subtitles;
      this.dubs = this.movie.dubs;
    } else {
      // when user cancels edit, set edit variable back to false
      this.edit = false;
    }
  }

  // producer, actor, subtitle, dub control
  addProducer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.producers.push(value.trim());
    }

    if (input) {
      input.value = "";
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

    if ((value || "").trim()) {
      this.actors.push(value.trim());
    }

    if (input) {
      input.value = "";
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

    if ((value || "").trim()) {
      this.subtitles.push(value.trim());
    }

    if (input) {
      input.value = "";
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

    if ((value || "").trim()) {
      this.dubs.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
  }

  removeDub(dub: string) {
    const index = this.dubs.indexOf(dub);

    if (index >= 0) {
      this.dubs.splice(index, 1);
    }
  }

  saveMovie(item: Movie) {
    if (this.form.valid) {
      this.movie = {
        id: this.id,
        ...this.form.value
      };
      this.edit = false;
      // requires validation to check that producers/actors/subtitles/dubs are not empty
      this.movie.producers = this.producers;
      this.movie.actors = this.actors;
      this.movie.subtitles = this.subtitles;
      this.movie.dubs = this.dubs;
      console.log(this.movie);

      this.http
        .post("http://localhost:8090/catalog/updateMovie", this.movie)
        .subscribe(updateSuccess => {
          if (updateSuccess) {
            // Reloads page for updated changes to movies
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["/catalog"]));
          } else {
            console.log("Failed to update movie.")
          }
        });


    }
  }
}
