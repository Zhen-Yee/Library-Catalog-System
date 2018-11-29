import { Component, OnDestroy, OnInit } from "@angular/core";
import { ObjectDetailsService } from "src/app/_services/object-details.service";
import { DataService } from "src/app/_services/DataService.service";
import { CatalogItemType } from "src/app/enums/catalogItemType";
import { filter, pairwise } from "rxjs/operators";
import { Router, NavigationEnd, RoutesRecognized } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { CartService } from "src/app/_services/CartService";
import { UserService } from "src/app/_services/user.service";


@Component({
  selector: "item-container",
  templateUrl: "item-container.component.html",
  styleUrls: ["item-container.component.css"]
})
export class ItemContainerComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private details: ObjectDetailsService,
    private cart: CartService,
    private user: UserService,
    private dataArray: DataService,
    private snack: MatSnackBar
  ) {}

  itemType = this.dataArray.getData()[this.details.index].itemType;

  ngOnInit() {
    this.router.events
    .pipe(filter(e => e instanceof RoutesRecognized))
    .pipe(pairwise())
    .subscribe((event: any[]) => {
      if (event[1].url.split("/").includes("sort")) {
        if (event[1].url.split("/").includes("Book")) {
          this.details.fromSort = "books";
          } else if (event[1].url.split("/").includes("Movie")) {
            this.details.fromSort = "movies";
          }  else if (event[1].url.split("/").includes("Magazine")) {
            this.details.fromSort = "magazines";
          }  else if (event[1].url.split("/").includes("Music")) {
            this.details.fromSort = "music";
          }
      }
      if (event[0].url.split("/").includes("Book")) {
        this.details.fromSort = "books";
        } else if (event[0].url.split("/").includes("Movie")) {
          this.details.fromSort = "movies";
        }  else if (event[0].url.split("/").includes("Magazine")) {
          this.details.fromSort = "magazines";
        }  else if (event[0].url.split("/").includes("Music")) {
          this.details.fromSort = "music";
        }
    });
  }

  nextItem() {
    const x = this.dataArray.getData();
    if (this.dataArray.getData().length === this.details.index + 1) {
      this.openSnackBar("Reached end of list.", "Close");
      return null;
    }
    this.details.index++;
    const item = x[this.details.index];
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

  previousItem() {
    const x = this.dataArray.getData();
    if (-1 === this.details.index - 1) {
      this.openSnackBar("Reached beginning of list.", "Close");
      return null;
    }
    this.details.index--;
    const item = x[this.details.index];
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

  addToCart() {
    const x = this.dataArray.getData();
    const item = x[this.details.index];

    if (item.qtyInStock > 0){

      this.openSnackBar(this.cart.addtoCart(item), "Close");
    }

    else {
      this.openSnackBar("Out of Stock", "Close");
    }

    console.log(this.cart);
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message , action, {
      duration: 5000,
    });
  }

  backToSearch() {
    if (this.details.fromSort === undefined || this.details.fromSort === null ) {
      this.router.navigate(["catalog"]);
    } else {
      this.router.navigate(["catalog", this.details.fromSort]);
    }
  }

  isAdmin() {
    return this.user.isAdmin;
  }
  ngOnDestroy() {

  }
}
