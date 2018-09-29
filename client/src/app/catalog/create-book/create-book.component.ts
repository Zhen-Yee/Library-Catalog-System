import { Component, OnInit } from '@angular/core';

import { Book} from "../../_models/book.model";
import { BookService} from "../../_services/catalog/book.service";

@Component({
  selector: 'create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  book: Book = new Book();
  submitted = false;

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  newBook(): void {
    this.submitted = false;
    this.book = new Book();
  }

  save() {
    this.book.qtyOnLoan = 0;
    this.book.qtyInStock = 3;
    this.book.author = "test";
    this.book.format = "Paperback";
    this.book.isbn10 = "0000000000";
    this.book.isbn13 = "0000000000000";
    this.book.language = "English";
    this.book.pages = 1337;
    this.book.publisher = "test";
    this.book.yearOfPublication = 1998;

    this.bookService.createBook(this.book)
      .subscribe(data => console.log(data), error => console.log(error));
    this.book = new Book();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
