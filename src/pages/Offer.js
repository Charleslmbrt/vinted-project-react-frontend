import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { offerId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${offerId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOffer();
    // eslint-disable-next-line
  }, []);

  return isLoading === true ? (
    <p>LOADING</p>
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        <div className="offer-pictures">
          <img src={data.product_image.secure_url} alt="" />
        </div>

        <div className="offer-infos">
          <div className="offer-price">
            <p>{data.product_price} €</p>
          </div>

          <ul className="offer-list">
            {data.product_details.map((detail, index) => {
              const keys = Object.keys(detail);

              return (
                <li key={index}>
                  <span className="offer-list-category">{keys[0]} </span>
                  <span className="offer-list-name">{detail[keys[0]]}</span>
                </li>
              );
            })}
          </ul>

          <div className="divider"></div>
          <div className="offer-content">
            <p className="name">{data.product_name}</p>
            <p className="description">{data.product_description}</p>
            <div className="offer-avatar-username">
              <img src={data.owner?.account.avatar.secure_url} alt="Avatar" />
              <p>{data.owner?.account.username}</p>
            </div>
          </div>
          <button className="button-offer-buy">Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
