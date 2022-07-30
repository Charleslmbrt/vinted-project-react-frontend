import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import homeImgRip from "../assets/img/home-ripped.svg";

const Home = () => {
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

  return isLoading === true ? (
    <p>LOADING</p>
  ) : (
    <>
      <div className="home-img">
        <img className="home-img-rip" src={homeImgRip} />
        <div className="home-block-text">
          <div className="home-text">
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button className="home-button">Commencer à vendre</button>
          </div>
        </div>
      </div>

      <main>
        <div className="offers-container">
          {data.offers.map((offer, index) => {
            // console.log(offer?.owner?.account?.username);
            // if (offer.owner) {}
            console.log(offer.product_image.secure_url);
            return (
              <div key={index} className="card-container">
                <div className="card-profile">
                  {offer.owner?.account.avatar.secure_url ? (
                    <img
                      className="card-avatar"
                      src={offer.owner?.account.avatar.secure_url}
                      alt="Avatar"
                    />
                  ) : (
                    <div className="default-avatar">
                      <p className="default-avatar-text">V</p>
                    </div>
                  )}
                  {offer.owner?.account.avatar.secure_url ? (
                    <p>{offer.owner?.account.username}</p>
                  ) : (
                    <p>Vendeur.se Vinted</p>
                  )}
                </div>

                <Link to={`/offer/${offer._id}`}>
                  <div className="card-product-img">
                    {/* {offer.product_pictures.map((picture, index) => {

                      return ( */}
                    <img
                      key={index}
                      src={offer.product_image.secure_url}
                      alt="Product"
                    />
                    {/* );
                    })} */}
                  </div>
                </Link>

                <div className="card-product-info">
                  <p className="card-product-price">{offer.product_price} €</p>
                  {offer.product_details.map((detail, index) => {
                    return (
                      <div key={index} className="card-product-sb">
                        <p className="card-product-size">{detail.TAILLE}</p>
                        <p className="card-product-brand">{detail.MARQUE}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
