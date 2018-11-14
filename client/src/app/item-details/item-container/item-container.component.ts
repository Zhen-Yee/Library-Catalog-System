import { Component, OnDestroy } from "@angular/core";
import { ObjectDetailsService } from "src/app/_services/object-details.service";
import { DataService } from "src/app/_services/DataService.service";
import { CatalogItemType } from "src/app/enums/catalogItemType";
import { Router } from "@angular/router";

@Component({
    selector: "item-container",
    templateUrl: "item-container.component.html",
    styleUrls: ["item-container.component.css"]
})
export class ItemContainerComponent implements OnDestroy{
    constructor(private router: Router, private details: ObjectDetailsService, private dataArray: DataService) {}

    nextItem() {
        const x = this.dataArray.getData();
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

    ngOnDestroy() {
        
    }
}
