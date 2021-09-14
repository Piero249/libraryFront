import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useBookData } from "../../context/book-context";
import BookCard from "../../components/BookCard/";

export default function BookDetail() {
  const { books } = useBookData();
  const { id } = useParams();

  const book = useMemo(() => books.find((el) => el.id == id));

  return <div>{book && <BookCard book={book} />}</div>;
}
