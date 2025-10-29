import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <input
        type="search"
        placeholder="Search books by title..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn" type="submit">
        Search
      </button>
    </form>
  );
}
