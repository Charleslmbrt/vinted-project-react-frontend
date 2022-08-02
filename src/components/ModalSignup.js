import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalSignup = ({ show, hide, setUser }) => {
  const iconX = <FontAwesomeIcon icon={faXmark} />;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    try {
      event.preventDefault();

      setErrorMessage("");

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          password: password,
          username: username,
          newsletter: newsletter,
        }
      );

      if (response.data) {
        setUser(response.data.token);
        hide();
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte!");
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
        <h2 className="signup-title">S'inscrire</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
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
            <div className="checkbox">
              <input
                type="checkbox"
                value={newsletter}
                onChange={(event) => {
                  setNewsletter(event.target.checked);
                }}
              />
              <span>S'inscrire à la newsletter</span>
            </div>
            <p className="text-tc">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
            <button className="button-registration" type="Submit">
              S'inscrire
            </button>
          </div>
        </form>
        <Link to="/login">
          <p className="already-account">
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </Link>
      </div>
    </div>
  ) : null;
};

export default ModalSignup;
