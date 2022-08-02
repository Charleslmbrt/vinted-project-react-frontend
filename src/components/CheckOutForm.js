import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckOutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handlePayment = async (event) => {
    try {
      event.preventDefault();

      // 01. On récupère les données bancaires que l'utillisateur rentre
      const cardInfos = elements.getElement(CardElement);

      // 02. Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardInfos);
      console.log(stripeResponse);
      // 03. Envoie du token à mon serveur
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          title: title,
          amount: price,
        }
      );
      if (response.data.status === "succeeded") {
        console.log("Paiement réussi !");
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {completed ? (
        <h1>Payment confirmé ! </h1>
      ) : (
        <form onSubmit={handlePayment}>
          <div className="cardelement">
            <CardElement />
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckOutForm;
