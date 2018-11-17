
import { CatalogItemType } from "./../enums/catalogItemType";
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Book } from "../_models/catalog/book.model";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { CatalogItem } from "../_models/catalog/catalogItem.model";
import { UserService } from "../_services/user.service";
import { DataService } from "../_services/DataService.service";
import { filter, pairwise } from "rxjs/operators";
import { Router, NavigationEnd, RoutesRecognized } from "@angular/router";
import { ObjectDetailsService } from "../_services/object-details.service";
import { BehaviorSubject } from "rxjs";

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
export class DataTableComponent implements OnInit, OnDestroy {
  constructor(
    private http: HttpClient,
    private details: ObjectDetailsService,
    private user: UserService,
    public dataService: DataService,
    private router: Router
  ) {}
  isDetails = false;
  paginator;
  sort;
  isLoaded = false;

  // Generated Data
  dataArray: CatalogItem[] = [];
  columnsToDisplay: string[] = ["itemType", "title", "qtyInStock", "qtyOnLoan"];
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
    this.router.events
    .pipe(filter(e => e instanceof RoutesRecognized))
    .pipe(pairwise())
    .subscribe((event: any[]) => {
      console.log(event);
      if (event[0].url.split("/").includes("details")) {
      this.dataService.fromDetails = true;
      } else {
        this.dataService.fromDetails = false;
      }
    });
  }

  ngAfterContentInit(): void {
    this.getAll();
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  getAll() {
    // if we come from the details page AND the searched array is > 0, display the searched array
    // otherwise just do get all.
    if (this.dataService.fromDetails && this.dataService.searchedDataFromService.length > 0 && !this.dataService.updatedSearchItem) {
      this.dataArray = this.dataService.getSearchedData();
      this.dataSource = new MatTableDataSource(this.dataArray);
      this.isLoaded = true;
    } else {
    // go into the get map function and populate the grid instead of going through the db
    // populate the items with their item type with findType() and fill the array
    this.isLoaded = false;
    this.http.get("http://localhost:8090/catalog/getMap").subscribe(x => {
      Object.keys(x).map(key => {
        this.dataService.findType(x[key]);
        this.dataArray = [...this.dataArray, ...x[key]];
      });
      this.dataSource = new MatTableDataSource(this.dataArray);
      this.isLoaded = true;
    });
  }
  }

  getSearch() {
    this.dataSource = null;
    this.isLoaded = false;
    this.dataSource = new MatTableDataSource(this.dataService.getData());
    console.log(this.dataSource);
    this.isLoaded = true;
  }

  moreDetails(item, index) {
    this.details.index = this.dataSource.filteredData.indexOf(item);
    // navigate to corresponding route depending on type
    if (item.itemType === CatalogItemType.Book) {
      this.details.book = item;
      this.router.navigate(["/details", item.itemType, item.title]);
    } else if (item.itemType === CatalogItemType.Magazine) {
      this.details.magazine = item;
      this.router.navigate(["/details", item.itemType, item.title]);
    } else if (item.itemType === CatalogItemType.Movie) {
      this.details.movie = item;
      this.router.navigate(["/details", item.itemType, item.title]);
    } else if (item.itemType === CatalogItemType.Music) {
      this.details.music = item;
      this.router.navigate(["/details", item.itemType, item.title]);
    }
  }

  redirectMagazinesPage() {
    this.router.navigate(["catalog/magazines"]);
  }

  redirectMoviesPage() {
    this.router.navigate(["catalog/movies"]);
  }

  redirectMusicPage() {
    this.router.navigate(["catalog/music"]);
  }

  redirectBookPage() {
    this.router.navigate(["catalog/books"]);
  }
  ngOnDestroy() {
    this.dataService.setData(this.dataArray);
  }
}
