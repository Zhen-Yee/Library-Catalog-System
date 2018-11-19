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
import { Magazine } from "../../_models/catalog/magazine.model";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";
import { DataService } from "src/app/_services/DataService.service";
import { ObjectDetailsService } from "src/app/_services/object-details.service";

@Component({
  selector: "app-sorting-magazines",
  templateUrl: "./sorting-magazines.component.html",
  styleUrls: ["./sorting-magazines.component.css"],
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
export class SortingMagazinesComponent implements OnInit {
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
    "language",
    "publisher",
    "dateOfPublication",
    "isbn10",
    "isbn13"
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
    this.getAllMusic();
  }

  backToSearch() {
    this.router.navigate(["catalog"]);
  }

  isAdmin() {
    return this.user.isAdmin;
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
  // calls getAll function to refill catalog with updated values
  receiveSaveMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAllMusic();
  }

  receiveDeleteMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAllMusic();
  }

  getAllMusic() {
    this.isLoaded = false;

    this.http
      .get<Magazine[]>(
        "http://localhost:8090/catalog/getAll" + CatalogItemType.Magazine
      )
      .subscribe(y => {
        y.map(index => {
          index.itemType = CatalogItemType.Magazine;
        });
        this.dataArray = [...this.dataArray, ...y];
        this.data.dataFromService = this.dataArray;
        this.dataSource = new MatTableDataSource(this.dataArray);
        this.isLoaded = true;
      });
  }
}
