import { Injectable } from '@angular/core';
import { Music } from "../_models/catalog/music.model";
import { Movie } from "../_models/catalog/movie.model";
import {Magazine} from "../_models/catalog/magazine.model";
import { Book } from "../_models/catalog/book.model";
import { CatalogItemType } from "./../enums/catalogItemType";

@Injectable()
export class DataService {
  findType(catalogItem: any) {
    // create null object to represent our object type
    // take out itemtype to have a representation of our backend object
    const music: Music = {
      itemType: null,
      id: null,
      qtyInStock: null,
      qtyOnLoan: null,
      title: null,
      type: null,
      artist: null,
      label: null,
      releaseDate: null,
      asin: null,
    };
    delete music.itemType;

    const book: Book = {
      itemType: null,
      id: null,
      qtyInStock: null,
      qtyOnLoan: null,
      title: null,
      author: null,
      format: null,
      pages: null,
      publisher: null,
      yearOfPublication: null,
      language: null,
      isbn10: null,
      isbn13: null,
    };
    delete book.itemType;

    const movie: Movie = {
      itemType: null,
      id: null,
      qtyInStock: null,
      qtyOnLoan: null,
      title: null,
      director: null,
      producers: null,
      actors: null,
      language: null,
      subtitles: null,
      dubs: null,
      releaseDate: null,
      runTime: null,
    };
    delete movie.itemType;

    const magazine: Magazine = {
      itemType: null,
      id: null,
      qtyInStock: null,
      qtyOnLoan: null,
      title: null,
      publisher: null,
      language: null,
      dateOfPublication: null,
      isbn10: null,
      isbn13: null,
    };
    delete magazine.itemType;


    // get the properties of every object including the object coming from the backend
    const properties = Object.getOwnPropertyNames(catalogItem);
    const movieprop = Object.getOwnPropertyNames(movie);
    const musicprop = Object.getOwnPropertyNames(music);
    const bookprop = Object.getOwnPropertyNames(book);
    const magazineprop = Object.getOwnPropertyNames(magazine);

    // compare the name of those properties
    // if match give it an itemtype and return it
    if (properties.sort().every(function(value, index) { return value === bookprop.sort()[index]; })) {
      catalogItem.itemType = CatalogItemType.Book;
      return catalogItem as Book;
    } else if (properties.sort().every(function(value, index) { return value === movieprop.sort()[index]; })) {
      catalogItem.itemType = CatalogItemType.Movie;
      return catalogItem as Movie;
    } else if (properties.sort().every(function(value, index) { return value === magazineprop.sort()[index]; })) {
      catalogItem.itemType = CatalogItemType.Magazine;
      return catalogItem as Magazine;
    } else if (properties.sort().every(function(value, index) { return value === musicprop  .sort()[index]; })) {
      catalogItem.itemType = CatalogItemType.Music;
      return catalogItem as Music;
    }
  }
}
