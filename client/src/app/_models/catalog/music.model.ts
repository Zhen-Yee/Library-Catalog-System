import {CatalogItem} from "./catalogItem.model";

export class Music extends CatalogItem {
  type: string;
  artist: string;
  label: string;
  releaseDate: string;
  asin: string;
}
