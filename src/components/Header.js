import logoVinted from "../assets/img/logo-vinted.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="top-bar">
        <div className="logo">
          <Link to="/">
            <img src={logoVinted} alt="Logo Vinted"></img>
          </Link>
        </div>
        <div className="search">
          <input placeholder="Recherche des articles"></input>
        </div>
        <div className="top-menu">
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <button>Vends tes arcticles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
