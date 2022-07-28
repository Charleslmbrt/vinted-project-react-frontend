import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="signup-container">
      <h2 className="signup-title">S'inscrire</h2>
      <form
        onSubmit={async (ev) => {
          try {
            ev.preventDefault();
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/signup",
              { body }
            );
            Cookies.set("userToken, response.data.token");
            setToken(response.data.token);
            navigate("/");
          } catch (error) {
            alert(error.response);
          }
        }}
        className="signup-form"
      >
        <input type="text" placeholder="Nom d'utilisateur" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <div className="signup-checkbox-container">
          <div className="checkbox">
            <input type="checkbox" />
            <span>S'inscrire à la newsletter</span>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button type="Submit">S'inscrire</button>
        </div>
      </form>
      <a href="">Tu as déjà un compte ? Connecte-toi !</a>
    </div>
  );
};

export default Signup;
