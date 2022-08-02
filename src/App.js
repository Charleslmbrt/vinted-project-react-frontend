import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "../src/assets/css/App.scss";

// import homeImg from "./assets/img/home-img.jpg;";

//imports components
import Header from "./components/Header";
import ModalSignup from "./components/ModalSignup";
import ModalLogin from "./components/ModalLogin";
import useModal from "./components/useModal";

//imports pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";

function App() {
  const { show: isLoginFormShowed, toggle: toggleLoginForm } = useModal();
  const { show: isRegistrationFormShowed, toggle: toggleRegistrationForm } =
    useModal();

  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (tokenToCheck) => {
    if (tokenToCheck !== null) {
      //Action de connexion
      console.log("Création d'un cookie userToken");
      Cookies.set("userToken", tokenToCheck, { expires: 10 });
    } else {
      //action de déconnexion
      console.log("Suppression d'un cookie userTOken");
      Cookies.remove("userToken");
    }
    setToken(tokenToCheck);
  };

  //connexion / inscription = setUser("387D3G3UYGUY3GUEGUYZEGGYUGUYGUYGUYGD");
  //déconnexion = setUser(null)

  return (
    <BrowserRouter>
      <ModalSignup
        show={isRegistrationFormShowed}
        hide={toggleRegistrationForm}
        setUser={setUser}
      />
      <ModalLogin
        show={isLoginFormShowed}
        hide={toggleLoginForm}
        setUser={setUser}
      />
      <Header
        toggleLoginForm={toggleLoginForm}
        toggleRegistrationForm={toggleRegistrationForm}
        token={token}
        setUser={setUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:offerId" element={<Offer />} />
        <Route
          path="/publish"
          element={<Publish token={token} toggleLoginForm={toggleLoginForm} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
