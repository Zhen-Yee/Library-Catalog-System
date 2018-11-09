import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { searchfilters } from "../_models/catalog/searchfilters.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import {DataService} from "../_services/DataService.service";
import {DataTableComponent} from "../dataTable/data-table.component";
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataArray: CatalogItem[] = [];
  form: FormGroup;

    constructor(private http: HttpClient, private fb: FormBuilder, public snackBar: MatSnackBar,
                public dataService: DataService, public dataTable: DataTableComponent) {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    }

  createForm() {
    console.log("enter Search");
    this.form = this.fb.group({
      iType: ["", Validators.required],
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
    this.createForm();
  }

  getSearchedItems() {

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
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  // default value - include "title"?
  fruits: string[] = [];
  allFruits: string[] = ['book', 'magazine', 'music', 'movie',
                        'title', 'author', 'publisher', 'language', 'format', 'isbn10',
                        'type', 'artist', 'label'];
 
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  // constructor() {
  //   this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
  //       startWith(null),
  //       map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  // }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
