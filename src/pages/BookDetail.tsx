import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBookDetail } from "../services/bookService";

function BookDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [book, setBook] = useState<any>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const coverId = location.state?.coverId;

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      const data = await getBookDetail(id);
      setBook(data);
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    if (!book) return;

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const exists = favorites.some((fav: any) => fav.key === book.key);

    setIsFavorite(exists);
  }, [book]);

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const exists = favorites.find((fav: any) => fav.key === book.key);

    if (exists) {
      toast.info("Bu kitap zaten favorilerinde 📚");
      return;
    }

    favorites.push({
      key: book.key,
      title: book.title,
      coverId,
      author: book.authors?.[0]?.name || book.author_name?.[0] || "Bilinmiyor",
    });

    localStorage.setItem("favorites", JSON.stringify(favorites));

    setIsFavorite(true);

    toast.success("❤️ Kitap favorilere eklendi!");
  };

  const removeFromFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const updatedFavorites = favorites.filter(
      (fav: any) => fav.key !== book.key,
    );

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setIsFavorite(false);

    toast.success("💔 Kitap favorilerden kaldırıldı!");
  };

  if (!book) {
    return <h2>📚 Yükleniyor...</h2>;
  }

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "Bu kitap için açıklama bulunamadı.";

  const shortDescription =
    description.length > 500 ? description.slice(0, 500) + "..." : description;

  return (
    <div
      style={{
        padding: "50px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,.15)",
            color: "#cbd5e1",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          ← Geri Dön
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "flex-start",
          flexWrap: "nowrap",
        }}
      >
        {coverId && (
          <img
            src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
            alt={book.title}
            style={{
              width: "240px",
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            }}
          />
        )}

        <div
          style={{
            flex: 1,
            textAlign: "left",
            maxWidth: "800px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginTop: "0",
              marginBottom: "20px",
              lineHeight: "1.1",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {book.title}
          </h1>

          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <h2
              style={{
                marginBottom: "15px",
              }}
            >
              📖 Konu
            </h2>

            <p
              style={{
                lineHeight: "1.8",
                fontSize: "18px",
                color: "#cbd5e1",
              }}
            >
              {showFullDescription ? description : shortDescription}
            </p>

            {description.length > 500 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                style={{
                  marginTop: "15px",
                  background: "transparent",
                  color: "#c084fc",
                  border: "1px solid #c084fc",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {showFullDescription ? "Daha Az Göster" : "Devamını Gör"}
              </button>
            )}

            <br />

            {isFavorite ? (
              <button
                onClick={removeFromFavorites}
                style={{
                  marginTop: "20px",
                  background: "#c084fc",
                  color: "white",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                💔 Favorilerden Kaldır
              </button>
            ) : (
              <button
                onClick={addToFavorites}
                style={{
                  marginTop: "20px",
                  background: "#c084fc",
                  color: "white",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                ❤️ Favorilere Ekle
              </button>
            )}
          </div>

          {book.subjects && (
            <>
              <h2
                style={{
                  marginTop: "35px",
                  marginBottom: "15px",
                }}
              >
                Kategoriler
              </h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {book.subjects.slice(0, 10).map((subject: string) => (
                  <span
                    key={subject}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "#cbd5e1",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "8px 14px",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
