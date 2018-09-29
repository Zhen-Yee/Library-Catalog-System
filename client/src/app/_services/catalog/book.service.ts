import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8090/api/books";

  constructor(private http: HttpClient) { }

  getBook(id: number): Observable<Object> {
    return this.http.get('${this.baseUrl}/${id}');
  }

  createBook(book: Object): Observable<Object> {
    return this.http.post(this.baseUrl + '/create', book);
  }

  getBookList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl + '/deleteAll', { responseType: 'text'});
  }
}
