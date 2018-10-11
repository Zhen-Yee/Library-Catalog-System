import {CatalogItem} from "./catalogItem.model";
import {CatalogItemType} from "../../enums/catalogItemType";

export class Music extends CatalogItem {
  type: string;
  artist: string;
  label: string;
  releaseDate: string;
  asin: string;


  constructor(itemType: CatalogItemType, id: number, qtyInStock: number, qtyOnLoan: number, titles: string, param: {
    type: string; artist: string; releaseDate: string; asin: string; label: string;}) {
    super(itemType, id, qtyInStock,qtyOnLoan,titles);
    this.type = param.type;
    this.artist = param.artist;
    this.releaseDate = param.releaseDate;
    this.asin = param.asin;
    this.label = param.label;
  }

  public toString = () : string => {
    return "id:   " + this.id + "\n" 
      + "Item Type:       " + this.itemType + "\n" 
      + "Title:       " + this.titles + "\n" 
      + "Artist:       " + this.artist + "\n" 
      + "Release Date:       " + this.releaseDate + "\n" 
      + "Type:     " + this.type + "\n" 
      + "ASIN:      " + this.asin + "\n" 
      + "Quantity in Stock:      " + this.qtyInStock.toString() + "\n" 
      + "Quantity on Loan:      " + this.qtyOnLoan.toString();
  }

}
