import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../checkout-product/CheckoutProduct";
import "./Payment.css";
import { GiReturnArrow } from "react-icons/gi";

const Payment = () => {
   const [{ basket, user }, dispatch] = useStateValue();

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
               <div className="payment__details"></div>
            </div>
         </div>
      </div>
   );
};

export default Payment;
