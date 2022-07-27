import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

// import homeImg from "./assets/img/home-img.jpg;";

//imports components
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
