import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );

    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (bookKey: string) => {
    const updatedFavorites = favorites.filter((book) => book.key !== bookKey);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setFavorites(updatedFavorites);

    toast.success("💔 Kitap favorilerden kaldırıldı!");
  };

  const searchQuery = searchParams.get("search") || "";

  const filteredFavorites = favorites.filter((book) =>
    book.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <h1>Favorilerim</h1>

      {favorites.length === 0 ? (
        <div style={{ marginTop: "50px" }}>
          <h2>Henüz favori kitabın yok</h2>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div style={{ marginTop: "50px" }}>
          <h2>"{searchQuery}" favorilerinde bulunamadı</h2>
        </div>
      ) : (
        <div className="book-grid">
          {filteredFavorites.map((book, index) => (
            <Link
              key={index}
              to={`/books/${book.key.split("/").pop()}`}
              state={{
                coverId: book.coverId || book.cover_i,
              }}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="book-card">
                {(book.coverId || book.cover_i) && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.coverId || book.cover_i}-L.jpg`}
                    alt={book.title}
                  />
                )}

                <h3>{book.title}</h3>

                <p
                  style={{
                    color: "#94a3b8",
                    marginBottom: "20px",
                  }}
                >
                  Yazar: {book.author || book.author_name?.[0] || "Bilinmiyor"}
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFavorite(book.key);
                  }}
                >
                  💔 Favorilerden Kaldır
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
