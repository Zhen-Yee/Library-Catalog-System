import {CatalogItem} from "./catalogItem.model";

export class Movie extends CatalogItem {
  director: string;
   producers: Array<string>;
   actors: Array<string>;
  language: string;
   subtitles: Array<string>;
   dubs: Array<string>;
  releaseDate: string;
  runTime: number;

  public toString = (): string => {
    return "id:   " + this.id + "\n\n"
      + "Title:       " + this.title + "\n"
      + "Director:       " + this.director + "\n"
      + "Producers:     " + this.producers + "\n"
      + "Actors:      " + this.actors + "\n"
      + "Language:      " + this.language + "\n"
      + "Subtitle:       " + this.subtitles + "\n"
      + "Release Date:      " + this.releaseDate + "\n"
      + "Runtime:      " + this.runTime + "\n\n"
      + "Quantity in Stock:      " + this.qtyInStock.toString() + "\n"
      + "Quantity on Loan:      " + this.qtyOnLoan.toString();
  }
}
