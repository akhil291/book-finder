import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books, favorites, onToggleFav }) {
  return (
    <section className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.key || book.cover_edition_key || book.edition_key?.[0]}
          book={book}
          isFav={favorites.some(
            (f) =>
              f.key ===
              (book.key || book.cover_edition_key || book.edition_key?.[0])
          )}
          onToggleFav={() => onToggleFav(book)}
        />
      ))}
    </section>
  );
}
