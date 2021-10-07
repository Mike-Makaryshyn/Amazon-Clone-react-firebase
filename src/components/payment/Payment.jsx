import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../checkout-product/CheckoutProduct";
import "./Payment.css";
import { GiReturnArrow } from "react-icons/gi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

const Payment = () => {
   const [{ basket, user }, dispatch] = useStateValue();
   const history = useHistory();

   const stripe = useStripe();
   const elements = useElements();

   const [succeeded, setSucceeded] = useState(false);
   const [processing, setProcessing] = useState("");
   const [error, setError] = useState(null);
   const [disabled, setDisabled] = useState(true);
   const [clientSecret, setClientSecret] = useState(true);

   useEffect(() => {
      // generate special stripe secret which allows us to charge a customer
      const getClientSecret = async () => {
         const response = await axios({
            method: "post",
            url: `payments/create?total=${getBasketTotal(basket) * 100}`,
         });

         setClientSecret(response.data.clientSecret);
      };

      getClientSecret();
   }, [basket]);

   console.log("the secret is - ", clientSecret);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);

      const payload = await stripe
         .confirmCardPayment(clientSecret, {
            payment_method: {
               card: elements.getElement(CardElement),
            },
         })
         .then(({ paymentIntent }) => {
            // paymentIntent === confirmation

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace("/orders");
         });
   };

   const handleChange = (e) => {
      setDisabled(e.empty);
      setError(e.error ? e.error.message : "");
   };

   return (
      <div className="payment">
         <div className="payment__container">
            <h2>
               Checkout (<span>{basket?.length} items</span>)
               <Link to="/checkout">
                  <span className="arrow">Return Back</span>
                  <GiReturnArrow className="arrow" />
               </Link>
            </h2>

            <div className="payment__section">
               <div className="payment__title">
                  <h3>Delivery Adress</h3>
               </div>
               <div className="payment__address">
                  <p> {user?.email}</p>
                  <p>123 React Lane</p>
                  <p>Los Angeles, CA</p>
               </div>
            </div>

            <div className="payment__section">
               <div className="payment__title">
                  <h3>Review items and delivery</h3>
               </div>
               <div className="payment__items">
                  {basket.map((item, i) => (
                     <CheckoutProduct
                        key={i}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                     />
                  ))}
                  {!basket.length && <strong>no items were added</strong>}
               </div>
            </div>

            <div className="payment__section">
               <div className="payment__title">
                  <h3>Payment Method</h3>
               </div>
               <div className="payment__details">
                  <form onSubmit={handleSubmit}>
                     <CardElement onChange={handleChange} />

                     <div className="payment__price-container">
                        <CurrencyFormat
                           renderText={(value) => <h4>Order Total: {value}</h4>}
                           decimalScale={2}
                           value={getBasketTotal(basket)}
                           displayType={"text"}
                           thousandSeparator={true}
                           prefix={"$"}
                        />
                        <button disabled={processing || disabled || succeeded}>
                           <span>
                              {processing ? <p>Prossesing</p> : "Buy Now"}
                           </span>
                        </button>
                     </div>
                     {error && <div>{error}</div>}
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Payment;
