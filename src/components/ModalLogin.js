import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalLogin = ({ show, hide, setUser, token }) => {
  const iconX = <FontAwesomeIcon icon={faXmark} />;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    try {
      event.preventDefault();

      setErrorMessage("");

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);
        hide();
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 404) {
        setErrorMessage("Email ou mot de passe incorrect.");
      }
    }
  };

  return show ? (
    <div className="modal">
      {/* <div onClick={(event) => event.stopPropagation()}  className="signup-container"> */}
      <div className="signup-container">
        <span className="iconx" onClick={hide}>
          {iconX}
        </span>

        <h2 className="signup-title">Se connecter</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <p style={{ color: "red" }}>{errorMessage}</p>

          <div className="signup-checkbox-container">
            <button className="button-registration" type="Submit">
              Se connecter
            </button>
          </div>
        </form>
        <Link to="/login">
          <p className="already-account">
            Pas encore de compte ? Inscris-toi !
          </p>
        </Link>
      </div>
    </div>
  ) : null;
};

export default ModalLogin;
