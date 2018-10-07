import { Component, OnInit } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Book } from "../../models/Example.models";

@Component({
  selector: "test",
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
   const book: Book = {
      name: sendThis
    };
    this.http
      .post<Book[]>("http://localhost:8090/addBook", book)
      .subscribe(sent => this.bookArray = sent);
  }

  delete(deleteThis: string) {
    const book: Book = {
      name: deleteThis
    };
    this.http
      .post<Book[]>("http://localhost:8090/deleteBook", book)
      .subscribe(deleted => this.bookArray = deleted);
  }
  update(updateThis: Book) {
    this.http.put("http://localhost:8090/update", updateThis);
  }
}
