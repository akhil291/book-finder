export function getCoverURL(cover_i, size = "M") {
  if (!cover_i) return null;
  return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`;
}
