import { Component, OnInit } from '@angular/core';
import { ObjectDetailsService } from 'src/app/_services/object-details.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private details: ObjectDetailsService, private user: UserService) { }
  element;
  ngOnInit() {
    if (this.details.movie) {
      console.log(this.details.movie.title);
      this.element = this.details.movie;
    }
  }
  isAdmin() {
    return this.user.isAdmin;
  }

}
