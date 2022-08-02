import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/CheckOutForm";
import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

const PUBLIC_KEY =
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP";

const stripePromise = loadStripe(PUBLIC_KEY);

const Payment = ({ token, toggleLoginForm }) => {
  const location = useLocation();
  const { title, price } = location.state;

  const protectFees = (price * 0.1).toFixed(2);
  const fees = (price * 0.2).toFixed(2);
  const total = Number(protectFees) + Number(fees) + Number(price);

  // useEffect(() => {
  //   if (token === null) {
  //     toggleLoginForm();
  //   }
  // }, [token]);

  return (
    <Elements stripe={stripePromise}>
      <div className="payment-main">
        <div className="payment-container">
          <div className="payment-card-container">
            <div className="payment-title">Résumé de la commande</div>
            <div className="divider"></div>
            <div className="payment-content">
              <ul>
                <li>
                  <span>Commande</span>
                  <span>{price} €</span>
                </li>
                <li>
                  <span>Frais protection acheteurs</span>
                  <span>{protectFees} €</span>
                </li>
                <li>
                  <span>Frais de port</span>
                  <span>{fees} €</span>
                </li>
              </ul>
            </div>
            <div className="divider"></div>
            <div className="payment-content">
              <ul>
                <li>
                  <span>TOTAL</span>
                  <span>{total} €</span>
                  {/* {console.log(total)} */}
                </li>
              </ul>
            </div>
            <div className="payment-content">
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir {title}.
              </p>
              <p>
                Vous allez payer {total} €(frais de protection et frais de port
                inclus).
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <CheckOutForm price={total} title={title} />
          <input className="button-payment" type="submit" value="Acheter" />
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
