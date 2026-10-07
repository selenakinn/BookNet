import { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

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
  };

  return (
    <div>
      <h1>Favoriler</h1>

      {favorites.length === 0 ? (
        <p>Henüz favori kitap yok.</p>
      ) : (
        favorites.map((book, index) => (
          <div key={index}>
            <h3>{book.title}</h3>

            <p>Yazar: {book.author_name?.[0]}</p>

            <button onClick={() => removeFavorite(book.key)}>
              Favorilerden Sil
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
