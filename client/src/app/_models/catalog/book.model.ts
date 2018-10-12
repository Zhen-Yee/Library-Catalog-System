import {CatalogItem} from "./catalogItem.model";
import {CatalogItemType} from "../../enums/catalogItemType";

export class Book extends CatalogItem {

  constructor(itemType: CatalogItemType, id: number, qtyInStock: number, qtyOnLoan: number, titles: string,
              param: {author: string; format: string; pages: number; publisher: string; yearOfPublication: number; language: string; isbn10: string; isbn13: string }) {
    super(itemType, id, qtyInStock, qtyOnLoan, titles);
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
    return "id:   " + this.id + "\n\n" 
      + "Title:       " + this.titles + "\n" 
      + "Author:       " + this.author + "\n" 
      + "Publisher:       " + this.publisher + "\n" 
      + "Pages:       " + this.pages + "\n" 
      + "Format:       " + this.format + "\n" 
      + "Year of Publication:       " + this.yearOfPublication + "\n" 
      + "Language:     " + this.language + "\n" 
      + "ISBN10:      " + this.isbn10 + "\n" 
      + "ISBN13:     " + this.isbn13 + "\n\n" 
      + "Quantity in Stock:      " + this.qtyInStock.toString() + "\n" 
      + "Quantity on Loan:      " + this.qtyOnLoan.toString();
  }
}
