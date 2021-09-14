import { createContext, useContext, useState, useEffect } from "react";

import api from "../services/api";

export const initialState = {
  books: [],
  setBooks: () => {},
};

const BookData = createContext(initialState);

const BookDataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    api
      .get("books/")
      .then(({ data }) => setBooks(data.results))
      .catch((err) => console.error(err));
  }, []);

  const handleAddBook = (book) => {
    setBooks([...books, book]);
  };

  const handleUpdateBook = (book) => {
    const newBooks = [...books];
    const idIndex = books.findIndex((b) => b.id === book.id);
    if (idIndex !== -1) {
      newBooks[idIndex] = book;
      setBooks([...newBooks]);
    }
  };

  const handleRemoveBook = (bookID) => {
    const newBooks = [...books];
    const idIndex = books.findIndex((b) => b.id === bookID);
    if (idIndex !== -1) {
      newBooks.splice(idIndex, 1);
      setBooks([...newBooks]);
    }
  };

  const handleFindBook = (search, paramSearch) => {
    const newBooks = [...books];
    const idIndex = books.findIndex((b) => b[paramSearch] === search);
    if (idIndex !== -1) {
      setSearchResults([newBooks[idIndex]]);
    }
  };

  const value = {
    books,
    setBooks,
    handleAddBook,
    handleRemoveBook,
    handleUpdateBook,
    searchResults,
    handleFindBook,
  };

  return <BookData.Provider value={value}>{children}</BookData.Provider>;
};

export const useBookData = () => {
  const context = useContext(BookData);
  if (context === undefined) {
    throw new Error("useBookData must be used within a CountProvider");
  }
  return context;
};

export default BookDataProvider;
