import {CatalogItem} from "./catalogItem.model";
import {CatalogItemType} from "../../enums/catalogItemType";
import {publish} from "rxjs/operators";

export class Magazine extends CatalogItem {

  publisher: string;
  language: string;
  dateOfPublication: string;
  isbn10: string;
  isbn13: string;

  constructor(id: number, qtyInStock: number, qtyOnLoan: number, titles: string, itemType: CatalogItemType, param: {
    publisher: string; language: string; dateOfPublication: string; isbn10: string; isbn13: string;}) {
    super(id, qtyInStock,qtyOnLoan,titles, itemType);
    this.publisher = param.publisher;
    this.language = param.language;
    this.dateOfPublication = param.dateOfPublication;
    this.isbn10 = param.isbn10;
    this.isbn13 = param.isbn13;
  }

}
