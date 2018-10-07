import {Actor} from "./movie/actor.model";
import {Producer} from "./movie/producer.model";
import {Subtitle} from "./movie/subtitle.model";
import {Dub} from "./movie/dub.model";

export class Movie extends CatalogItem {
  director: string;
  producers: Set<Producer>;
  actors: Set<Actor>;
  language: string;
  subtitles: Set<Subtitle>;
  dubs: Set<Dub>
  releaseDate: String;
  runTime: number;
}
