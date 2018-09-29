import {Component, Input, OnInit} from '@angular/core';
import { BookService} from "../../_services/catalog/book.service";
import {Book} from "../../_models/book.model";

import {BookListComponent} from "../book-list/book-list.component";

@Component({
  selector: 'book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  @Input() book: Book;

  constructor(private bookService: BookService, private listComponent: BookListComponent) { }

  ngOnInit() {
  }

}
