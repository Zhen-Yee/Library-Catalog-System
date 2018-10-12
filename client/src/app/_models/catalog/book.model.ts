import {CatalogItem} from "./catalogItem.model";
import {CatalogItemType} from "../../enums/catalogItemType";

export class Book extends CatalogItem {

  constructor(itemType: CatalogItemType, id: number, qtyInStock: number, qtyOnLoan: number, title: string,
              param: {author: string; format: string; pages: number; publisher: string; yearOfPublication: number; language: string; isbn10: string; isbn13: string }) {
    super(itemType, id, qtyInStock, qtyOnLoan, title);
    this.author = param.author;
    this.format = param.format;
    this.pages = param.pages;
    this. publisher = param.publisher;
    this.yearOfPublication = param.yearOfPublication;
    this.language = param.language;
    this.isbn10 = param.isbn10;
    this.isbn13 = param.isbn13
  }

  author: string;
  format: string;
  pages: number;
  publisher: string;
  yearOfPublication: number;
  language: string;
  isbn10: string;
  isbn13: string;

  public toString = () : string => {
    return "Product Details" + "\n\n" +
      "You are viewing a " + this.itemType + "." +
      this.itemType + " is derived from" + CatalogItem.name + "." + "\n\n" +
      "Author: "
      + this.author + "," + "\n" + "Format: "
      + this.format + "," + "\n" + "Pages: "
      + this.pages + "," + "\n" + "Publisher: "
      + this.publisher + "," + "\n" + "Language: "
      + this.language + "," + '\n' + "Year Of Publication: "
      + this.yearOfPublication + "," + "\n" + "ISBN10: "
      + this.isbn10  + "," + "\n" + "ISBN13: "
      + this.isbn13 + " ";
  }

}
