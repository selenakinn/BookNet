import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (!search.trim()) {
      return;
    }

    if (location.pathname === "/favorites") {
      navigate(`/favorites?search=${search}`);
    } else {
      navigate(`/?search=${search}`);
    }
  };

  const showSearchBar =
    !location.pathname.startsWith("/books/") &&
    location.pathname !== "/suggest";

  return (
    <nav className="navbar">
      <div className="logo">📚 BookNet</div>

      {showSearchBar && (
        <div className="search-bar">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder={
              location.pathname === "/favorites"
                ? "Favorilerde ara..."
                : "Kitap ara..."
            }
          />

          <button onClick={handleSearch}>Ara</button>
        </div>
      )}

      <div className="nav-links">
        <NavLink to="/" onClick={() => setSearch("")}>
          Ana Sayfa
        </NavLink>

        <NavLink to="/favorites" onClick={() => setSearch("")}>
          Favoriler
        </NavLink>

        <NavLink to="/suggest" onClick={() => setSearch("")}>
          Kitap Öner
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
