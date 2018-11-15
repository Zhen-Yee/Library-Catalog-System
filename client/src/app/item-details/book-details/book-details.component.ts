import { Component, OnInit } from "@angular/core";
import { ObjectDetailsService } from "src/app/_services/object-details.service";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.css"]
})
export class BookDetailsComponent implements OnInit {

  constructor(private details: ObjectDetailsService, private user: UserService) { }
  element;
  ngOnInit() {
    if (this.details.book) {
      console.log(this.details.book.title);
      this.element = this.details.book;
    }
  }

  isAdmin() {
    return this.user.isAdmin;
  }

}
