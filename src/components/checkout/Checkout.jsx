import React from "react";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../checkout-product/CheckoutProduct";
import Subtotal from "../subtoal/Subtotal";
import "./Checkout.css";

const Checkout = () => {
   const [{ basket, user }, dispatch] = useStateValue();

   return (
      <div className="checkout">
         <div className="checkout__left">
            <img
               className="checkout__ad"
               src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
               alt="ad"
            />
            {user && <h3>Hi! {user?.email}</h3>}
            <h2 className="checkout__title">Your shopping Basket</h2>
            {basket.map((item, i) => {
               const { id, title, image, price, rating } = item;
               return (
                  <CheckoutProduct
                     key={i}
                     id={id}
                     title={title}
                     image={image}
                     price={price}
                     rating={rating}
                  />
               );
            })}
            {!basket.length && <strong>no items were added</strong>}
         </div>

         <div className="checkout__right">
            <Subtotal />
         </div>
      </div>
   );
};

export default Checkout;
