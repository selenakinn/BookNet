import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getBookDetail } from "../services/bookService";

function BookDetail() {
  const { id } = useParams();
  const location = useLocation();

  const [book, setBook] = useState<any>(null);

  const coverId = location.state?.coverId;

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      const data = await getBookDetail(id);
      setBook(data);
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <h2>Yükleniyor...</h2>;
  }

  return (
    <div className="book-detail">
      <h1>{book.title}</h1>

      {coverId && (
        <img
          src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
          alt={book.title}
          style={{
            width: "250px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        />
      )}

      <h2>Konu</h2>

      <p
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.8",
        }}
      >
        {typeof book.description === "string"
          ? book.description
          : book.description?.value || "Bu kitap için açıklama bulunamadı."}
      </p>

      {book.subjects && (
        <>
          <h2 style={{ marginTop: "30px" }}>Kategoriler</h2>

          <p>{book.subjects.slice(0, 10).join(", ")}</p>
        </>
      )}
    </div>
  );
}

export default BookDetail;
