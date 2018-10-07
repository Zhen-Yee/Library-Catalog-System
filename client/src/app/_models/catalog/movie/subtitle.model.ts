import {Movie} from "../movie.model";

export class Subtitle {
  id: number;
  subLanguage: string;
  movies: Set<Movie>;
}
