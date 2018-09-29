package com.soen343.server.controller;

import com.soen343.server.models.catalog.Book;
import com.soen343.server.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    BookRepository repository;

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        System.out.println("Get all Books...");

        List<Book> books = new ArrayList<>();
        repository.findAll().forEach(books::add);

        return books;
    }

    @PostMapping("books/create")
    public Book postBook(@RequestBody Book book) {
        Book _book = repository.save(new Book(book.getTitle(), book.getQtyInStock(), 0, book.getAuthor(),
                book.getFormat(), book.getPages(), book.getYearOfPublication(), book.getPublisher(), book.getLanguage(),
                book.getIsbn10(), book.getIsbn13()));

        return _book;
    }

    @DeleteMapping("books/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") long id) {
        System.out.println("Delete Book with ID = " + id + "...");

        repository.deleteById(id);

        return new ResponseEntity<>("Book has been deleted!", HttpStatus.OK);
    }

    @DeleteMapping("books/deleteAll")
    public ResponseEntity<String> deleteAllBooks() {
        System.out.println("Nuclear Launch Detected...");

        repository.deleteAll();

        return new ResponseEntity<>("All Books have been deleted!", HttpStatus.OK);
    }

    @GetMapping("/books/title/{title}")
    public List<Book> findByTitle(@PathVariable String title) {

        List<Book> books = repository.findByTitle(title);
        return books;
    }

    // not sure if this will work
    @PutMapping("/books/{id}")
    public ResponseEntity<Book> checkoutBook(@PathVariable("id") long id, @RequestBody Book book) {
        System.out.println("Attempting to checkout book with ID = " + id + "...");

        Optional<Book> bookData = repository.findById(id);

        if (bookData.isPresent()){
            Book _book = bookData.get();
            boolean success = _book.checkoutItem();
            if (success) {
                System.out.println(_book + ": Sucessfully checked out");
                return new ResponseEntity<>(repository.save(_book), HttpStatus.ACCEPTED);
            } else {
                System.out.println(_book + ": NOT IN STOCK");
                return new ResponseEntity<>(repository.save(_book), HttpStatus.PRECONDITION_REQUIRED);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
