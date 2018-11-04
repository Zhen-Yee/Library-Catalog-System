import { CatalogItemType } from "./../enums/catalogItemType";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Book } from "../_models/catalog/book.model";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { CatalogItem } from "../_models/catalog/catalogItem.model";
import { Music } from "../_models/catalog/music.model";
import { Movie } from "../_models/catalog/movie.model";
import {Magazine} from "../_models/catalog/magazine.model";
import { UserService } from "../_services/user.service";


@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})

export class DataTableComponent implements OnInit {
  constructor(private http: HttpClient, private user: UserService) {}


  paginator;
  sort;
  isLoaded = false;

  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator) set paginatorContent(content: ElementRef) {
    this.paginator = content;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  // Generated Data
  dataArray: CatalogItem[] = [];
  columnsToDisplay: string[] = ["itemType", "qtyInStock", "qtyOnLoan", "title"];
  expandedElement: CatalogItem[];
  dataSource: MatTableDataSource<CatalogItem>;
  message: string = "Getting Catalog Items...";

  ngOnInit() {
    this.getAll();
  }

  findType(catalogItem: any) {
    // create null object to represent our object type
    // take out itemtype to have a representation of our backend object
    const music: Music = {
      itemType: null,
      id: null,
      qtyInStock: null,
      qtyOnLoan: null,
      title: null,
      type: null,
      artist: null,
      label: null,
      releaseDate: null,
      asin: null,
    };
    delete music.itemType;

    const book: Book = {
      itemType: null,
      id: null,
      qtyInStock: null,
      qtyOnLoan: null,
      title: null,
      author: null,
      format: null,
      pages: null,
      publisher: null,
      yearOfPublication: null,
      language: null,
      isbn10: null,
      isbn13: null,
    };
    delete book.itemType;

    const movie: Movie = {
      itemType: null,
      id: null,
      qtyInStock: null,
      qtyOnLoan: null,
      title: null,
      director: null,
      producers: null,
      actors: null,
      language: null,
      subtitles: null,
      dubs: null,
      releaseDate: null,
      runTime: null,
    };
    delete movie.itemType;

    const magazine: Magazine = {
      itemType: null,
      id: null,
      qtyInStock: null,
      qtyOnLoan: null,
      title: null,
      publisher: null,
      language: null,
      dateOfPublication: null,
      isbn10: null,
      isbn13: null,
    };
    delete magazine.itemType;


    // get the properties of every object including the object coming from the backend
    const properties = Object.getOwnPropertyNames(catalogItem);
    const movieprop = Object.getOwnPropertyNames(movie);
    const musicprop = Object.getOwnPropertyNames(music);
    const bookprop = Object.getOwnPropertyNames(book);
    const magazineprop = Object.getOwnPropertyNames(magazine);

    // compare the name of those properties
    // if match give it an itemtype and return it
    if (properties.sort().every(function(value, index) { return value === bookprop.sort()[index]; })) {
      catalogItem.itemType = CatalogItemType.Book;
      return catalogItem as Book;
    } else if (properties.sort().every(function(value, index) { return value === movieprop.sort()[index]; })) {
      catalogItem.itemType = CatalogItemType.Movie;
      return catalogItem as Movie;
    } else if (properties.sort().every(function(value, index) { return value === magazineprop.sort()[index]; })) {
      catalogItem.itemType = CatalogItemType.Magazine;
      return catalogItem as Magazine;
    } else if (properties.sort().every(function(value, index) { return value === musicprop  .sort()[index]; })) {
      catalogItem.itemType = CatalogItemType.Music;
      return catalogItem as Music;
    }
  }


  isAdmin() {
    return this.user.isAdmin;
}
  // calls getAll function to refill catalog with updated values
  receiveSaveMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAll();
  }

  receiveDeleteMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAll();
  }

  getAll() {
    // go into the get map function and populate the grid instead of going through the db
    // populate the items with their item type with findType() and fill the array
    this.isLoaded = false;
    this.http.get("http://localhost:8090/catalog/getMap").subscribe(x => { Object.keys(x).map(key => {this.findType(x[key]);
      this.dataArray = [...this.dataArray, ...x[key]];
    });
      this.dataSource = new MatTableDataSource(this.dataArray);
      this.isLoaded = true;
    });
  }

}

