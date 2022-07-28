import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.scss";

// import homeImg from "./assets/img/home-img.jpg;";

//imports components
import Header from "./components/Header";

//imports pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:offerId" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
