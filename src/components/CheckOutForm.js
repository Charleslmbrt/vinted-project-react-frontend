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

      // 02. Demander à Stripe si elles sont valables
      // puis Stripe génère un token via l'API Stripe.
      // On envoie les données bancaires dans la requête.
      const stripeResponse = await stripe.createToken(cardInfos, {
        name: "Nicolas", //info non dynamique
      });
      console.log(stripeResponse);
      // 03. Envoie de ce stripeToken à mon serveur (API vinted).
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
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
