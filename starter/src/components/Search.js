import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
import "../App.css";

function Search() {
  const [books, setBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState([]);

  const [query, setQuery] = useState("");
  const [searchBooks] = useQuery(query);
  const [mergedBooks, setMergedBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
      setMapOfIdToBooks(createMapOfBooks(data));
    });
  }, []);

  useEffect(() => {
    const combined = searchBooks.map((book) => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    });

    setMergedBooks(combined);
  }, [searchBooks, mapOfIdToBooks]);

  const updateBookShelf = (book, whereTo) => {
    const updatedBooks = books.map((b) => {
      if (b.id === book.id) {
        book.shelf = whereTo;
        return book;
      }
      return b;
    });

    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = whereTo;
      updatedBooks.push(book);
    }
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo);
  };

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {searchBooks.length > 0 && (
            <div>
              <h2>Search Returned: {searchBooks.length} books</h2>
            </div>
          )}
          <ol className="books-grid">
            {mergedBooks.map((b) => (
              <li key={b.id}>
                <Book book={b} changeBookShelf={updateBookShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Search;
