import {CatalogItem} from "./catalogItem.model";
import {CatalogItemType} from "../../enums/catalogItemType";
export class Music extends CatalogItem {

  artist: string;
  label: string;
  releaseDate: string;
  asin: string;

  constructor(itemType: CatalogItemType, id: number, qtyInStock: number, qtyOnLoan: number, title: string, param: {
    artist: string; label: string; releaseDate: string; asin: string;}) {
    super(itemType, id, qtyInStock,qtyOnLoan,title);
    this.artist = param.artist;
    this.label = param.label;
    this.releaseDate = param.releaseDate;
    this.asin = param.asin;
  }

  public toString = () : string => {
    return "Product Details" + "\n\n" +
      "You are viewing a " + this.itemType + "." +
      this.itemType + " is derived from" + CatalogItem.name + "." + "\n\n" +
      "Type: "
      +  "," + "\n" + "Artist: "
      + this.artist + "," + "\n" + "Label: "
      + this.label + "," + "\n" + "Release Date: "
      + this.releaseDate + "," + "\n" + "ASIN: "
      + this.asin + " ";
  }

}
