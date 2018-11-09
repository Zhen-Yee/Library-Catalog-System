import {CatalogItemType} from "../../enums/catalogItemType";

export abstract class CatalogItem {

  itemType: CatalogItemType;
  id: number;
  qtyInStock: number;
  qtyOnLoan: number;
  title: string;

  constructor(itemType: CatalogItemType, id: number, qtyInStock: number, qtyOnLoan: number, title: string) {
    this.id = id;
    this.qtyInStock = qtyInStock;
    this.qtyOnLoan = qtyOnLoan;
    this.title = title;
    this.itemType = itemType;
  }

  // public getType() {
  //   return this.itemType;
  // }
}
