import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { CatalogItem } from "../../_models/catalog/catalogItem.model";
import { Music } from "../../_models/catalog/music.model";
import { CatalogItemType } from ".././../enums/catalogItemType";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { ObjectDetailsService } from "src/app/_services/object-details.service";
import { DataService } from "src/app/_services/DataService.service";

@Component({
  selector: "app-sorting-music",
  templateUrl: "./sorting-music.component.html",
  styleUrls: ["./sorting-music.component.css"],
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
export class SortingMusicComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private user: UserService,
    private router: Router,
    private details: ObjectDetailsService,
    private data: DataService
  ) {}

  dataArray: CatalogItem[] = [];
  columnsToDisplay: string[] = [
    "title",
    "qtyInStock",
    "qtyOnLoan",
    "type",
    "artist",
    "label",
    "releaseDate",
    "asin"
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
    this.getAllMusic();
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  receiveSaveMessage($event) {
    this.dataArray = [];
    this.message = $event;
    this.getAllMusic();
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
    this.getAllMusic();
  }

  getAllMusic() {
    this.http
      .get<Music[]>(
        "http://localhost:8090/catalog/getAll" + CatalogItemType.Music
      )
      .subscribe(y => {
        y.map(index => {
          index.itemType = CatalogItemType.Music;
        });
        this.dataArray = [...this.dataArray, ...y];
        this.data.dataFromService = this.dataArray;
        this.dataSource = new MatTableDataSource(this.dataArray);
        this.isLoaded = true;
      });
  }
}
