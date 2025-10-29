import React from "react";
import { getCoverURL } from "../utils";

export default function BookCard({ book, isFav, onToggleFav }) {
  const cover = getCoverURL(book.cover_i, "M");
  const authors = book.author_name ? book.author_name.join(", ") : "Unknown";
  const year = book.first_publish_year || book.publish_year?.[0] || "—";

  return (
    <article className="book-card">
      <div className="cover">
        <img
          src={cover || "https://via.placeholder.com/120x180?text=No+Cover"}
          alt={`${book.title} cover`}
        />
      </div>
      <div className="meta">
        <h3>{book.title}</h3>
        <div className="authors">{authors}</div>
        <div className="year">{year}</div>
        <div className="actions">
          <button className="btn small" onClick={onToggleFav}>
            {isFav ? "Unfavorite" : "Add to favorites"}
          </button>
          <a
            className="more"
            href={`https://openlibrary.org${book.key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenLibrary
          </a>
        </div>
      </div>
    </article>
  );
}
