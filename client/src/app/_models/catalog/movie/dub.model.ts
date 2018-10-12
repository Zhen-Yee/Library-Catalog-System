import {Movie} from "../movie.model";

export class Dub {
  id: number;
  dubLanguage: string;
  movies: Set<Movie>

  public getMovies() {
    return this.movies;
  }
}
