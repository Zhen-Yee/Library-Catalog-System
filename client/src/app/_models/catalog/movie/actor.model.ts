import {Movie} from "../movie.model";

export class Actor {
  id: number;
  actor: string;
  movies: Set<Movie>;
}
