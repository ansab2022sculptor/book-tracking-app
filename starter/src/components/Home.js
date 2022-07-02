import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./../App.css";
import * as BooksAPI from "./../BooksAPI";
import Header from "./Header";
import Shelves from "./Shelves";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
      setMapOfIdToBooks(createMapOfBooks(data));
      console.log(data);
    });
  }, []);

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };

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

  return (
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <Shelves books={books} updateBookShelf={updateBookShelf} />
      </div>
      <div className="open-search">
        <NavLink to="/search">Add a book</NavLink>
      </div>
    </div>
  );
};

export default Home;
