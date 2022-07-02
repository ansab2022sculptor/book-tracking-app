import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import "./../App.css";
import * as BooksAPI from "./../BooksAPI";
import Header from "./Header";
import Shelves from "./Shelves";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());
  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useQuery(query);
  const [mergedBooks, setMergedBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
      setMapOfIdToBooks(createMapOfBooks(data));
      console.log(data);
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
  }, [searchBooks]);

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
        <Link to="/search">
          <a>Add a book</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
