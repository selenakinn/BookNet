import { useState } from "react";
import { toast } from "react-toastify";

function SuggestBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    if (title.trim().length < 2) {
      toast.error("Kitap adı en az 2 karakter olmalıdır.");
      return;
    }

    const suggestions = JSON.parse(localStorage.getItem("suggestions") || "[]");

    const alreadyExists = suggestions.find(
      (book: any) => book.title.toLowerCase() === title.toLowerCase(),
    );

    if (alreadyExists) {
      toast.info("Bu kitabı daha önce önerdiniz.");
      return;
    }

    suggestions.push({
      title,
      author,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("suggestions", JSON.stringify(suggestions));

    toast.success("📚 Öneriniz alındı!");

    setTitle("");
    setAuthor("");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1>Kitap Öner</h1>

      <p
        style={{
          marginBottom: "30px",
          color: "#9ca3af",
        }}
      >
        Kütüphanemizde görmek istediğin kitapları önerebilirsin.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Kitap Adı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Yazar"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button type="submit">Öneriyi Gönder</button>
      </form>
    </div>
  );
}

export default SuggestBook;
