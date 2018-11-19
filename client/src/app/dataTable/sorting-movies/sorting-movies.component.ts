import { CatalogItemType } from "./../../enums/catalogItemType";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { CatalogItem } from "../../_models/catalog/catalogItem.model";
import { Movie } from "../../_models/catalog/movie.model";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";
import { ObjectDetailsService } from "src/app/_services/object-details.service";
import { DataService } from "src/app/_services/DataService.service";

@Component({
  selector: "app-sorting-movies",
  templateUrl: "./sorting-movies.component.html",
  styleUrls: ["./sorting-movies.component.css"],
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
export class SortingMoviesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private user: UserService,
    private router: Router,
    private details: ObjectDetailsService,
    private data: DataService
  ) {}
  paginator;
  sort;
  isLoaded = false;

  // Generated Data
  dataArray: CatalogItem[] = [];
  columnsToDisplay: string[] = [
    "title",
    "qtyInStock",
    "qtyOnLoan",
    "director",
    "actors",
    "producers",
    "language",
    "subtitles",
    "dubs",
    "releaseDate",
    "runTime"
  ];
  expandedElement: CatalogItem[];
  dataSource: MatTableDataSource<CatalogItem>;
  message: string = "Getting Catalog Items...";

  @ViewChild(MatSort)
  set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator)
  set paginatorContent(content: ElementRef) {
    this.paginator = content;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
    this.getAllMovies();
  }

  isAdmin() {
    return this.user.isAdmin;
  }
  // calls getAll function to refill catalog with updated values
  receiveSaveMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAllMovies();
  }

  receiveDeleteMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAllMovies();
  }
  backToSearch() {
    this.router.navigate(["catalog"]);
  }

  moreDetails(item) {
    this.details.index = this.dataSource.filteredData.indexOf(item);
    // navigate to corresponding route depending on type
    if (item.itemType === CatalogItemType.Book) {
      this.details.book = item;
      this.router.navigate(["sort/details", item.itemType, item.title]);
    } else if (item.itemType === CatalogItemType.Magazine) {
      this.details.magazine = item;
      this.router.navigate(["sort/details", item.itemType, item.title]);
    } else if (item.itemType === CatalogItemType.Movie) {
      this.details.movie = item;
      this.router.navigate(["sort/details", item.itemType, item.title]);
    } else if (item.itemType === CatalogItemType.Music) {
      this.details.music = item;
      this.router.navigate(["sort/details", item.itemType, item.title]);
    }
  }

  getAllMovies() {
    this.isLoaded = false;

    this.http
      .get<Movie[]>(
        "http://localhost:8090/catalog/getAll" + CatalogItemType.Movie
      )
      .subscribe(y => {
        y.map(index => {
          index.itemType = CatalogItemType.Movie;
        });
        this.dataArray = [...this.dataArray, ...y];
        this.data.dataFromService = this.dataArray;
        this.dataSource = new MatTableDataSource(this.dataArray);
        this.isLoaded = true;
      });
  }
}
