import { Component, OnInit } from "@angular/core";
import { ObjectDetailsService } from "src/app/_services/object-details.service";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.css"]
})
export class BookDetailsComponent implements OnInit {

  constructor(private details: ObjectDetailsService) { }
  element;
  ngOnInit() {
    if (this.details.book) {
      console.log(this.details.book.title);
      this.element = this.details.book;
    }
  }

}
