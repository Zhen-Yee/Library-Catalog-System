import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { searchfilters } from "../_models/catalog/searchfilters.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import {DataService} from "../_services/DataService.service";
import {DataTableComponent} from "../dataTable/data-table.component";
import {CatalogItem} from "../_models/catalog/catalogItem.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataArray: CatalogItem[] = [];
  form: FormGroup;

    constructor(private http: HttpClient, private fb: FormBuilder, public snackBar: MatSnackBar,
                public dataService: DataService, public dataTable: DataTableComponent) { }

  createForm() {
    console.log("enter Search");
    this.form = this.fb.group({
      iType: ["", Validators.required],
      title: ["", Validators.required],
      search: ["a", Validators.required],
      author: ["a", Validators.required],
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
    this.createForm();
  }

  getSearchedItems() {
    this.dataArray = [];

    const filters: searchfilters = {
    ...this.form.value,
    };

    this.http.post("http://localhost:8090/catalog/search", filters)
  .subscribe((confirmation) => {Object.keys(confirmation).map(
    key => {
      this.dataService.findType(confirmation[key]);
      this.dataArray = [...this.dataArray, ...confirmation[key]];
      // if you had an array to store your stuff, you would do it like this
    });

    this.dataService.setData(this.dataArray);
    if (confirmation) {
      this.openSnackBar("Search successful!", "Close");
      this.dataTable.getSearch();
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
