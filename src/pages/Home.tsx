import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchBooks } from "../services/bookService";

function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const getBooks = async (query = search) => {
    if (!query.trim()) {
      alert("Lütfen bir kitap adı girin.");
      return;
    }

    const data = await searchBooks(query);
    setBooks(data.docs.slice(0, 10));
  };

  useEffect(() => {
    getBooks("bestseller");
  }, []);

  const addToFavorites = (book: any) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const alreadyExists = favorites.find((fav: any) => fav.key === book.key);

    if (!alreadyExists) {
      favorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Kitap favorilere eklendi!");
    } else {
      alert("Bu kitap zaten favorilerde!");
    }
  };

  return (
    <div>
      <h1>📚 Popüler Kitaplar</h1>

      <p>
        Binlerce kitap arasında arama yapabilir, favorilerine ekleyebilir ve
        detaylarını inceleyebilirsin.
      </p>

      <br />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Kitap ara..."
      />

      <button onClick={() => getBooks()}>Ara</button>

      <div className="book-grid">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <Link
              to={`/books/${book.key.split("/").pop()}`}
              state={{ coverId: book.cover_i }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {book.cover_edition_key && (
                <img
                  src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
                  alt={book.title}
                />
              )}

              <h3>{book.title}</h3>
            </Link>

            <p>Yazar: {book.author_name?.[0] || "Bilinmiyor"}</p>

            <button onClick={() => addToFavorites(book)}>
              ❤️ Favorilere Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
