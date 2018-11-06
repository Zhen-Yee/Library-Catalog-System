import { Component, OnInit } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Book } from "../../models/Example.models";


@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpClient) {}
  ngOnInit() {}

}
