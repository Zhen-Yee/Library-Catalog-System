import { Music } from "./../_models/catalog/music.model";
import { Movie } from "./../_models/catalog/movie.model";
import { Magazine } from "./../_models/catalog/magazine.model";
import { Book } from "./../_models/catalog/book.model";
import { CatalogItem } from "./../_models/catalog/catalogItem.model";

export class ObjectDetailsService {
  public book: Book;
  public movie: Movie;
  public magazine: Magazine;
  public music: Music;
  public index: number;
  public paginaton: number;
  public catalogItem: CatalogItem
}
