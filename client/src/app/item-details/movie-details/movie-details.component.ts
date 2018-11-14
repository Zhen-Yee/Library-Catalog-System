import { Component, OnInit } from '@angular/core';
import { ObjectDetailsService } from 'src/app/_services/object-details.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private details: ObjectDetailsService) { }
  element;
  ngOnInit() {
    if (this.details.movie) {
      console.log(this.details.movie.title);
      this.element = this.details.movie;
    }
  }

}
