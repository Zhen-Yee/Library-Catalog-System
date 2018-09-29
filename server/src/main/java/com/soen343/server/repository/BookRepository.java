package com.soen343.server.repository;

import com.soen343.server.models.catalog.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {
}
