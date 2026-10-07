import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchBooks } from "../services/bookService";
import { toast } from "react-toastify";

function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const [notFound, setNotFound] = useState(false);

  const searchQuery = searchParams.get("search");

  const getBooks = async (query: string) => {
    const data = await searchBooks(query);

    if (data.docs.length === 0) {
      setNotFound(true);
      setBooks([]);
    } else {
      setNotFound(false);
      setBooks(data.docs.slice(0, 10));
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getBooks(searchQuery);
    } else {
      getBooks("bestseller");
    }
  }, [searchQuery]);

  const addToFavorites = (book: any) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const alreadyExists = favorites.find((fav: any) => fav.key === book.key);

    if (alreadyExists) {
      toast.info("📚 Bu kitap zaten favorilerinde!");
      return;
    }

    favorites.push({
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      cover_edition_key: book.cover_edition_key,
      cover_i: book.cover_i,
    });

    localStorage.setItem("favorites", JSON.stringify(favorites));

    toast.success("❤️ Kitap favorilere eklendi!");
  };

  return (
    <div>
      {!searchQuery && (
        <>
          <h1>Popüler Kitaplar</h1>

          <p>Keşfet • Oku • Favorilerine Ekle</p>

          <br />
        </>
      )}

      {searchQuery && !notFound && <h2>"{searchQuery}" için sonuçlar</h2>}

      {notFound && <h2>"{searchQuery}" için sonuç bulunamadı</h2>}

      <div className="book-grid">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <Link
              to={`/books/${book.key.split("/").pop()}`}
              state={{ coverId: book.cover_i }}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
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
