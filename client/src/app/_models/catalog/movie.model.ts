import {Actor} from "./movie/actor.model";
import {Producer} from "./movie/producer.model";
import {Subtitle} from "./movie/subtitle.model";
import {Dub} from "./movie/dub.model";

export class Movie extends CatalogItem {
  director: string;
  private producers: Set<Producer>;
  private actors: Set<Actor>;
  language: string;
  private subtitles: Set<Subtitle>;
  private dubs: Set<Dub>;
  releaseDate: String;
  runTime: number;

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
}
