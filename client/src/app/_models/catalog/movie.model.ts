import {Actor} from "./movie/actor.model";
import {Producer} from "./movie/producer.model";
import {Subtitle} from "./movie/subtitle.model";
import {Dub} from "./movie/dub.model";
import {CatalogItem} from "./catalogItem.model";
import { CatalogItemType } from "src/app/enums/catalogItemType";

export class Movie extends CatalogItem {
  director: string;
  producers: Set<Producer>;
  actors: Set<Actor>;
  language: string;
  subtitles: Set<Subtitle>;
  dubs: Set<Dub>;
  releaseDate: String;
  runTime: number;
  
  constructor(itemType: CatalogItemType, id: number, qtyInStock: number, qtyOnLoan: number, title: string,
    param: {director: string; producers: Set<Producer>;actors: Set<Actor>; language: string; subtitles: Set<Subtitle>; dubs: Set<Dub>; releaseDate: String; runTime: number; }) {
super(itemType, id, qtyInStock, qtyOnLoan, title);
this.director = param.director;
this.dubs = param.dubs;
this.actors = param.actors;
this.language = param.language;
this.producers = param.producers;
this.releaseDate = param.releaseDate;
this.runTime = param.runTime;
this.subtitles = param.subtitles;
}

  public addProducer(producer: Producer) {
    this.producers.add(producer);
    producer.getMovies().add(this);
  }

  public removeProducer(producer: Producer) {
    this.producers.delete(producer);
    producer.getMovies().delete(this);
  }

  public addActor(actor: Actor) {
    this.actors.add(actor);
    actor.getMovies().add(this);
  }

  public removeActor(actor: Actor) {
    this.actors.delete(actor);
    actor.getMovies().delete(this);
  }

  public addSubtitle(sub: Subtitle) {
    this.subtitles.add(sub);
    sub.getMovies().add(this);
  }

  public removeSubtitle(sub: Subtitle) {
    this.subtitles.delete(sub);
    sub.getMovies().delete(this);
  }

  public addDub(dub: Dub) {
    this.dubs.add(dub);
    dub.getMovies().add(this);
  }

  public removeDub(dub: Dub) {
    this.dubs.delete(dub);
    dub.getMovies().delete(this);
  }

    public toString = () : string => {
    return "Product Details" + "\n" +
      "You are viewing a " + this.itemType + "." +
      this.itemType + " is derived from" + CatalogItem.name + "." + "\n\n" +
      
      "Director: "
      + this.director + "," + "\n" + "Producers: "
      + this.producers + "," + "\n" + "Actors: "
      + this.actors + "," + "\n" + "Language: "
      + this.language + "," + "\n" + "Subtitles: "
      + this.subtitles + "," + '\n' + "Release Date: "
      + this.releaseDate + "," + "\n" + "Run-time: "
      + this.runTime + " ";
  }

}
