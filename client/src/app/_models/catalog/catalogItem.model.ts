import {CatalogItemType} from "../../enums/catalogItemType";

export abstract class CatalogItem{

   constructor(id: number, qtyInStock: number, qtyOnLoan: number, titles: string, itemType: CatalogItemType) {
    this.id = id;
    this.qtyInStock = qtyInStock;
    this.qtyOnLoan = qtyOnLoan;
    this.titles = titles;
    this.itemType = itemType;
  }

  id: number;
  qtyInStock: number;
  qtyOnLoan: number;
  titles: string;
  itemType: CatalogItemType;
}
