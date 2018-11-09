import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Magazine } from "../../_models/catalog/magazine.model";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-add-magazine",
  templateUrl: "./add-magazine.component.html",
  styleUrls: ["./add-magazine.component.css"]
})
export class AddMagazineComponent implements OnInit {
form: FormGroup;
  constructor(private fb: FormBuilder, private httpClient : HttpClient, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      // magazine formgroup matching a magazine object with validators
        title: ["", Validators.required],
        publisher: ["", Validators.required],
        dateOfPublication: ["", Validators.required],
        language: ["", Validators.required],
        isbn10: ["", Validators.required],
        isbn13: ["", Validators.required],
    });
  }

  addMagazine() {
    if (this.form.valid) {
      // using spread operator to pass the values to the object
      const magazine: Magazine = {
       ...this.form.value
      };
      console.log(magazine);

      this.httpClient.post("http://localhost:8090/catalog/addMagazine", magazine)
        .subscribe((confirmation) => {
          if (confirmation) {
            this.openSnackBar("Magazine added!", "Close");
          } else {
            this.openSnackBar("Error adding magazine!", "Close");
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
