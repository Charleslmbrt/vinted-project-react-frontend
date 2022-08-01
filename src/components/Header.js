import logoVinted from "../assets/img/logo-vinted.svg";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = ({ token, setUser, onOpening, onOpeningLogin }) => {
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

        {!token ? (
          <div className="top-menu">
            <button onClick={onOpening} className="button-line">
              <span>S'inscrire</span>
            </button>
            {/* <Link to="/Signup">
              <button className="button-line">
                <span>S'inscrire</span>
              </button>
            </Link> */}

            <button onClick={onOpeningLogin} className="button-line">
              <span>Se connecter</span>
            </button>
            <Link to="/publish">
              <button className="button-solid">Vends tes articles</button>
            </Link>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setUser(null);
                navigate("/");
              }}
            >
              Se déconnecter
            </button>

            <Link to="/publish">
              <button className="button-solid">Vends tes articles</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
