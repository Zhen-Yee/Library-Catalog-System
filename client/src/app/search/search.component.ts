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
      itemType: ["a", Validators.required],
      id: ["b", Validators.required],
      qtyInStock: ["c", Validators.required],
      qtyOnLoan: ["d", Validators.required],
      title: ["e", Validators.required],
      search: ["", Validators.required],
      author: ["g", Validators.required],
      format: ["h", Validators.required],
          publisher: ["i", Validators.required],
          language: ["j", Validators.required],
          isbn10: ["k", Validators.required],
          isbn13: ["l", Validators.required],
          type: ["m", Validators.required],
          artist: ["n", Validators.required],
          label: ["o", Validators.required],
          asin: ["p", Validators.required],
          producers: ["q", Validators.required],
          actors: ["r", Validators.required],
          subtitles: ["s", Validators.required],
          dubs: ["t", Validators.required],
          releaseDate: ["u", Validators.required],
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

  this.http.post("http://localhost:8090/catalog/search", filters)
  .subscribe((confirmation) => {
    if (confirmation) {
      this.openSnackBar("Search successful!", "Close");
    } else {
      this.openSnackBar("Search unsuccessful!", "Close");
    }
  });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message , action, {
      duration: 5000,
    });
  }
}
