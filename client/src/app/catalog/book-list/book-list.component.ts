import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BookService} from "../../_services/catalog/book.service";
import { Book} from "../../_models/book.model";

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Observable<Book[]>;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.reloadData();
  }

  deleteBooks() {
    this.bookService.deleteAll().subscribe(data => {
      console.log(data);
      this.reloadData();
    },
      error => console.log('ERROR:' + error));
  }

  reloadData() {
    this.books = this.bookService.getBookList();
  }

}
