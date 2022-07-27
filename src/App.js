import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import logoVinted from "./assets/img/logo-vinted.svg";
// import homeImg from "./assets/img/home-img.jpg;";

//imports components
import Home from "./components/Home";
import Offer from "./components/Offer";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
 
    <BrowserRouter>

{isLoading === true ? (<p>LOADING</p> ):(
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

 <div className="home-img">
   <div className="home-block-text">
     <div className="home-text">
       <p>Prêts à faire du tri dans vos placards ?</p>
       <button>Commencer à vendre</button>
     </div>
   </div>
 </div>

 <main>
   <div className="main-container">
     {data.offers.map((offer, index) => {
       console.log(offer.username);
       return (
         <div className="card-container">
           <div className="card-profile">
             <img className="card-avatar" src="" alt="Avatar" />
             <p>{offer.username}</p>
           </div>
           <div className="card-product-img"></div>
           <div className="card-product-info">
             <p className="card-product-info-price">60€</p>
             <p className="card-product-info-details">
               6 ANS / 110-116 CM
             </p>
             <p className="card-product-info-brand">ZARA</p>
           </div>
         </div>
       );
     })}
   </div>
 </main>

 <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/offer" element={<Offer />} />
 </Routes>
)}
     
    </BrowserRouter>
  );
} // fin de la function APP

export default App;
