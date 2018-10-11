import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.css"]
})
export class AddItemComponent implements OnInit {
  // selected value to decide which component to call
  selectedValue: string;
  items = [
    {value: "book", viewValue: "Book"},
    {value: "magazine", viewValue: "Magazine"},
    {value: "Music", viewValue: "Music"},
    {value: "movies", viewValue: "Movies"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
