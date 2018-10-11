import {Movie} from "../movie.model";

export class Producer {
  id?: number;
  producer: string;
  movies: Set<Movie>;

  public getMovies() {
    return this.movies;
  }
}
