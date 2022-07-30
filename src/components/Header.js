import logoVinted from "../assets/img/logo-vinted.svg";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  const iconSearch = <FontAwesomeIcon icon={faMagnifyingGlass} />;

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
          <i className="search-icon">{iconSearch}</i>
        </div>

        {token === null ? (
          <div className="top-menu">
            <Link to="/signup">
              <button className="button-line">
                <span>S'inscrire</span>
              </button>
            </Link>
            <Link to="/login">
              <button className="button-line">
                <span>Se connecter</span>
              </button>
            </Link>
            <button className="button-solid">Vends tes articles</button>
          </div>
        ) : (
          <button
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
