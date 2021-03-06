import { Component, OnInit } from '@angular/core';
import { ObjectDetailsService } from 'src/app/_services/object-details.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-magazine-details',
  templateUrl: './magazine-details.component.html',
  styleUrls: ['./magazine-details.component.css']
})
export class MagazineDetailsComponent implements OnInit {

  constructor(private details: ObjectDetailsService, private user: UserService) { }
  element;
  ngOnInit() {
    if (this.details.magazine) {
      console.log(this.details.magazine.title);
      this.element = this.details.magazine;
    }
  }
  isAdmin() {
    return this.user.isAdmin;
  }
}
