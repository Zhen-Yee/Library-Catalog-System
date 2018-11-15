import { Component, OnInit } from '@angular/core';
import { ObjectDetailsService } from 'src/app/_services/object-details.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.css']
})
export class MusicDetailsComponent implements OnInit {

  constructor(private details: ObjectDetailsService, private user: UserService) { }
  element;
  ngOnInit() {
    if (this.details.music) {
      console.log(this.details.music.title);
      this.element = this.details.music;
    }
  }
  isAdmin() {
    return this.user.isAdmin;
  }
}
