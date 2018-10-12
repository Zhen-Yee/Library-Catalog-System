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
    return "id:   " + this.id + "\n\n" 
      + "Title:       " + this.titles + "\n" 
      + "Publisher:       " + this.publisher + "\n" 
      + "Date of Publication:       " + this.dateOfPublication + "\n" 
      + "Language:     " + this.language + "\n" 
      + "ISBN10:      " + this.isbn10 + "\n" 
      + "ISBN13:     " + this.isbn13 + "\n\n" 
      + "Quantity in Stock:      " + this.qtyInStock.toString() + "\n" 
      + "Quantity on Loan:      " + this.qtyOnLoan.toString();
  }




}
