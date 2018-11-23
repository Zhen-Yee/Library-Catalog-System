import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { CatalogItem } from "../../_models/catalog/catalogItem.model";
import { CatalogItemType } from ".././../enums/catalogItemType";
import { UserService } from "../../_services/user.service";
import { Router, NavigationEnd, RoutesRecognized } from "@angular/router";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Book } from "../../_models/catalog/book.model";
import { ObjectDetailsService } from "src/app/_services/object-details.service";
import { filter, pairwise } from "rxjs/operators";
import { DataService } from "src/app/_services/DataService.service";

@Component({
  selector: "app-sorting-book",
  templateUrl: "./sorting-book.component.html",
  styleUrls: ["./sorting-book.component.css"],
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
export class SortingBookComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private data: DataService,
    private details: ObjectDetailsService,
    private user: UserService,
    private router: Router
  ) {}
  dataArray: CatalogItem[] = [];
  columnsToDisplay: string[] = [
    "title",
    "qtyInStock",
    "qtyOnLoan",
    "author",
    "pages",
    "yearOfPublication",
    "publisher",
    "language"
  ];
  dataSource: MatTableDataSource<CatalogItem>;
  isLoaded = false;
  paginator;
  sort;
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
    this.getAllBooks();
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  receiveSaveMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAllBooks();
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

  backToSearch() {
    this.router.navigate(["catalog"]);
  }

  receiveDeleteMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAllBooks();
  }

  getAllBooks() {
    this.http
      .get<Book[]>(
        "http://localhost:8090/catalog/getAll" + CatalogItemType.Book
      )
      .subscribe(x => {
        x.map(index => {
          index.itemType = CatalogItemType.Book;
        });
        this.dataArray = [...this.dataArray, ...x];
        this.data.dataFromService = this.dataArray;
        this.dataSource = new MatTableDataSource(this.dataArray);
        this.isLoaded = true;
      });
  }
}
