export class Book extends CatalogItem {
  constructor(param: { author: string; format: string; pages: string; publisher: string; yearOfPublication: string; language: string; isbn10: string; isbn13: string }) {
    super();
  }

  author: string;
  format: string;
  pages: number;
  publisher: string;
  yearOfPublication: number;
  language: string;
  isbn10: string;
  isbn13: string;
}
