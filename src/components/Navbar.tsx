import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Ana Sayfa</Link> | <Link to="/favorites">Favoriler</Link> |{" "}
      <Link to="/about">Hakkında</Link>
    </nav>
  );
}

export default Navbar;
