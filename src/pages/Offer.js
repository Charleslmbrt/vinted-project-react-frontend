import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
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
    data.offers.map((offer, index) => {
      return (
        <div key={index} className="offer-body">
          <div className="offer-container">
            <div className="offer-pictures"></div>
            <div className="offer-infos">
              <div className="offer-price"></div>
              <div className="offer-list"></div>
              <div className="divider"></div>
              <div className="offer-content">
                <p className="name"></p>
                <p className="description"></p>
                <div className="offer-avatar-username"></div>
              </div>
              <button>Acheter</button>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default Offer;
