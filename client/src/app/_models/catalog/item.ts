
export class Item {
  //CatalogItem
  id: number;
  qtyInStock: number;
  qtyOnLoan: number;
  title: string;

  //book
  author: string;
  format: string;
  pages: number;
  publisher: string;
  yearOfPublication: number;
  language: string;
  isbn10: string;
  isbn13: string;

  //music
  type: string;
  artist: string;
  label: string;
  releaseDate: string;
  asin: string;

  constructor(){

}
}
