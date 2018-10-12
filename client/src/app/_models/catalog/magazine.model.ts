import {CatalogItem} from "./catalogItem.model";
import {CatalogItemType} from "../../enums/catalogItemType";

export class Magazine extends CatalogItem {

  publisher: string;
  language: string;
  dateOfPublication: string;
  isbn10: string;
  isbn13: string;

  constructor(itemType: CatalogItemType, id: number, qtyInStock: number, qtyOnLoan: number, title: string, param: {
    publisher: string; language: string; dateOfPublication: string; isbn10: string; isbn13: string;}) {
    super(itemType, id, qtyInStock,qtyOnLoan,title);
    this.publisher = param.publisher;
    this.language = param.language;
    this.dateOfPublication = param.dateOfPublication;
    this.isbn10 = param.isbn10;
    this.isbn13 = param.isbn13;
  }

  public toString = () : string => {
    return "Product Details" + "\n\n" +
      "You are viewing a " + this.itemType + "." +
      this.itemType + " is derived from" + CatalogItem.name + "." + "\n\n" +
      "Publisher: "
      + this.publisher + "," + "\n" + "Language: "
      + this.language + "," + '\n' + "Date Of Publication: "
      + this.dateOfPublication + "," + "\n" + "ISBN10: "
      + this.isbn10  + "," + "\n" + "ISBN13: "
      + this.isbn13 + " ";
  }



}
