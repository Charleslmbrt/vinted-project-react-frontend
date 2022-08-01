import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "../src/assets/css/App.scss";

// import homeImg from "./assets/img/home-img.jpg;";

//imports components
import Header from "./components/Header";
import ModalSignup from "./components/ModalSignup";
import ModalLogin from "./components/ModalLogin";

//imports pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import PostAd from "./pages/PostAd";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

function App() {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
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

  //connexion / inscription
  // setUser("387D3G3UYGUY3GUEGUYZEGGYUGUYGUYGUYGD");

  //déconnexion
  // setUser(null)

  const closeModal = () => {
    setShow(false);
  };

  const onOpening = () => {
    setShow(true);
  };

  const closeModalLogin = () => {
    setShowLogin(false);
  };

  const onOpeningLogin = () => {
    setShowLogin(true);
  };

  return (
    <BrowserRouter>
      <ModalSignup closeModal={closeModal} show={show} setUser={setUser} />
      <ModalLogin
        closeModalLogin={closeModalLogin}
        showLogin={showLogin}
        setUser={setUser}
      />
      <Header
        onOpening={onOpening}
        onOpeningLogin={onOpeningLogin}
        token={token}
        setUser={setUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:offerId" element={<Offer />} />
        <Route path="/postad" element={<PostAd />} />
        {/* <Route path="/signup" element={<Signup setUser={setUser} />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
