import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { searchfilters } from "../_models/catalog/searchfilters.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup
  constructor(private http: HttpClient, private fb: FormBuilder,public snackBar: MatSnackBar) { }
  createForm() {
    console.log("enter Search");
    this.form = this.fb.group({
      itemType: ["", Validators.required],
      id: ["", Validators.required],
      qtyInStock: ["", Validators.required],
      qtyOnLoan: ["", Validators.required],
      title: ["", Validators.required],
      search: ["", Validators.required],
      author: ["", Validators.required],
      format: ["", Validators.required],
          publisher: ["", Validators.required],
          language: ["", Validators.required],
          isbn10: ["", Validators.required],
          isbn13: ["", Validators.required],
          type: ["", Validators.required],
          artist: ["", Validators.required],
          label: ["", Validators.required],
          asin: ["", Validators.required],
          producers: ["", Validators.required],
          actors: ["", Validators.required],
          subtitles: ["", Validators.required],
          dubs: ["", Validators.required],
          releaseDate: ["", Validators.required],
    });
  }
  ngOnInit() {
    this.createForm()
  }

  getSearchedItems(){

    const filters: searchfilters = {

    ...this.form.value,
      
    }
    
  console.log(filters);
  }
}
