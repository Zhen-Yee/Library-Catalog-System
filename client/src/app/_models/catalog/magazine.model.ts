import {CatalogItem} from "./catalogItem.model";
import {CatalogItemType} from "../../enums/catalogItemType";

export class Magazine extends CatalogItem {

  publisher: string;
  language: string;
  dateOfPublication: string;
  isbn10: string;
  isbn13: string;

  constructor(itemType: CatalogItemType, id: number, qtyInStock: number, qtyOnLoan: number, titles: string, param: {
    publisher: string; language: string; dateOfPublication: string; isbn10: string; isbn13: string;}) {
    super(itemType, id, qtyInStock,qtyOnLoan,titles);
    this.publisher = param.publisher;
    this.language = param.language;
    this.dateOfPublication = param.dateOfPublication;
    this.isbn10 = param.isbn10;
    this.isbn13 = param.isbn13;
  }

  public toString = () : string => {
    return "This is a " + this.itemType +
      " that you are viewing. " +
      "Magazine is derived from" + CatalogItem.name + "," + "\n" +
      "It has a {Publisher="
      + this.publisher + "," + "\n" + "Language="
      + this.language + "," + '\n' + "DateOfPublication="
      + this.dateOfPublication + "," + "\n" + "ISBN10="
      + this.isbn10  + "," + "\n" + "ISBN13="
      + this.isbn13 + "}";
  }




}
