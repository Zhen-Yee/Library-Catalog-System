import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "../models/Book.models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  // get request,
  get() {
    this.http
      .get<Book>("http://localhost:8090/getBook")
      .subscribe(book => console.log(book));
  }

  post(sendThis: string) {
   const book: Book = {
      name: sendThis
    };
    this.http
      .post<string>("http://localhost:8090/addBook", book)
      .subscribe(sent => console.log(sent));
  }

  delete(deleteThis: string) {
    const book: Book = {
      name: deleteThis
    };
    this.http
      .post("http://localhost:8090/deleteBook", book)
      .subscribe(deleted => console.log(deleted));
  }
  update(updateThis: Book) {
   // this.http.put("http://localhost:8090/update", updateThis)
  }
}
