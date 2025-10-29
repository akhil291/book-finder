import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";

const API_BASE = "https://openlibrary.org/search.json";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bf_favs") || "[]");
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("bf_favs", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!query) return;
    setPage(1);
    fetchBooks(query, 1, true);
  }, [query]);

  async function fetchBooks(q, pg = 1, replace = false) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE}?title=${encodeURIComponent(q)}&page=${pg}`
      );
      if (!res.ok) throw new Error("Network response not ok");
      const data = await res.json();
      const docs = data.docs || [];
      setBooks((prev) => (replace ? docs : [...prev, ...docs]));
      setHasMore(docs.length > 0 && data.numFound > pg * 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(q) {
    setQuery(q.trim());
  }

  function loadMore() {
    const next = page + 1;
    setPage(next);
    fetchBooks(query, next);
  }

  function toggleFavorite(book) {
    const key = book.key || book.cover_edition_key || book.edition_key?.[0];
    setFavorites((prev) => {
      if (prev.find((b) => b.key === key))
        return prev.filter((b) => b.key !== key);
      const newFav = {
        key,
        title: book.title,
        author_name: book.author_name,
        cover_i: book.cover_i,
      };
      return [newFav, ...prev];
    });
  }

  return (
    <div className="container">
      <header>
        <h1>📚 Book Finder</h1>
        <p className="subtitle">
          Search books by title — powered by OpenLibrary
        </p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <main>
        {error && <div className="error">Error: {error}</div>}
        {!query && (
          <div className="hint">Start by searching a book title above.</div>
        )}

        {query && (
          <>
            <BookList
              books={books}
              favorites={favorites}
              onToggleFav={toggleFavorite}
            />
            {loading && <div className="loading">Loading...</div>}
            {!loading && hasMore && (
              <div className="center">
                <button className="btn" onClick={loadMore}>
                  Load more
                </button>
              </div>
            )}
            {!loading && books.length === 0 && (
              <div className="no-results">No results found.</div>
            )}
          </>
        )}

        {favorites.length > 0 && (
          <section className="favorites">
            <h2>Favorites</h2>
            <div className="fav-list">
              {favorites.map((f) => (
                <div key={f.key} className="fav-item">
                  <img
                    src={
                      f.cover_i
                        ? `https://covers.openlibrary.org/b/id/${f.cover_i}-S.jpg`
                        : "https://via.placeholder.com/60x90?text=No+Cover"
                    }
                    alt="cover"
                  />
                  <div>
                    <div className="fav-title">{f.title}</div>
                    <div className="fav-author">
                      {(f.author_name || []).slice(0, 2).join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer>
        <small>Data from Open Library · Demo app</small>
      </footer>
    </div>
  );
}
