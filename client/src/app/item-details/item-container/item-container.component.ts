import { Component, OnDestroy } from "@angular/core";
import { ObjectDetailsService } from "src/app/_services/object-details.service";
import { DataService } from "src/app/_services/DataService.service";
import { CatalogItemType } from "src/app/enums/catalogItemType";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { CartService } from "src/app/_services/CartService";

@Component({
  selector: "item-container",
  templateUrl: "item-container.component.html",
  styleUrls: ["item-container.component.css"]
})
export class ItemContainerComponent {
  constructor(
    private router: Router,
    private details: ObjectDetailsService,
    private cart: CartService,
    private dataArray: DataService,
    private snack: MatSnackBar
  ) {}

  itemType;
  addtocart;

  ngOnInit() {

    const data = this.dataArray.getData();
    const item = data[this.details.index];
    this.itemType = item.itemType;
    console.log(this.itemType);
    
  }

  nextItem() {
    const x = this.dataArray.getData();
    if (this.dataArray.getData.length === this.details.index + 1) {
      this.openSnackBar("Nothing to check", "Close");
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
      this.openSnackBar("Nothing to check", "Close");
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
    this.router.navigate([""]);
  }
}
