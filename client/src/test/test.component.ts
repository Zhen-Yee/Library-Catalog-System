import { Component, OnInit } from "@angular/core";
import { HttpClient} from "@angular/common/http";

<<<<<<< Updated upstream
import { Book } from "../models/Example.models";
=======
import { Book } from "../models/Book.models";
import { Test } from "../models/test.model";
>>>>>>> Stashed changes

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  bookName: string;
  password: string;
  bookArray;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  // get request,
  get() {
    this.http
      .get<Book[]>("http://localhost:8090/getBook")
      .subscribe(book => this.bookArray = book);
  }

  post(sendThis: string) {
   const book: Test = {
      name: sendThis
    };
    this.http
      .post<Test[]>("http://localhost:8090/addBook", book)
      .subscribe(sent => this.bookArray = sent);
  }

  delete(deleteThis: string) {
    const book: Test = {
      name: deleteThis
    };
    this.http
      .post<Test[]>("http://localhost:8090/deleteBook", book)
      .subscribe(deleted => this.bookArray = deleted);
  }
  update(updateThis: Test) {
   // this.http.put("http://localhost:8090/update", updateThis)
  }
}
