import {CatalogItemType} from "../../enums/catalogItemType";

export abstract class CatalogItem{

  itemType: CatalogItemType;
  id: number;
  qtyInStock: number;
  qtyOnLoan: number;
  titles: string;

  constructor(itemType: CatalogItemType, id: number, qtyInStock: number, qtyOnLoan: number, titles: string) {
    this.id = id;
    this.qtyInStock = qtyInStock;
    this.qtyOnLoan = qtyOnLoan;
    this.titles = titles;
    this.itemType = itemType;
  }

  public getType() {
    return this.itemType;
  }
}
