import React from "react";
import "./CheckoutProduct.css";
import { AiFillStar } from "react-icons/ai";
import { useStateValue } from "../../StateProvider";

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
   const [{ basket }, dispatch] = useStateValue();

   const removeFromBaket = () => {
      dispatch({
         type: "REMOVE_FROM_BASKET",
         id,
      });
   };

   return (
      <div className="checkout-product">
         <img className="checkout-product__image" src={image} alt={title} />

         <div className="checkout-product__info">
            <p className="checkout-product__title">{title}</p>
            <p className="checkout-product__price">
               <small>$</small>
               <strong>{price}</strong>
            </p>
            <div className="checkout-product__rating">
               {Array(rating)
                  .fill()
                  .map((_, i) => (
                     <p className="star" key={i}>
                        <AiFillStar />
                     </p>
                  ))}
            </div>
            {!hideButton && (
               <button onClick={removeFromBaket}>Remove from Basket</button>
            )}
         </div>
      </div>
   );
};

export default CheckoutProduct;
