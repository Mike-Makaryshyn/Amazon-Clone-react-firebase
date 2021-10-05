import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useStateValue } from "../../StateProvider";
import "./Product.css";

const Product = ({ id, title, image, price, rating }) => {
   const [{ basket }, dispatch] = useStateValue();

   const addToBasket = () => {
      dispatch({
         type: "ADD_TO_BASKET",
         item: {
            id,
            title,
            image,
            price,
            rating,
         },
      });
   };

   return (
      <div className="product">
         <div className="product__info">
            <p>{title}</p>
            <p className="product__price">
               <small>$</small>
               <strong>{price}</strong>
            </p>
            <div className="product__rating">
               {Array(rating)
                  .fill()
                  .map((_, i) => (
                     <p className="star" key={i}>
                        <AiFillStar />
                     </p>
                  ))}
            </div>
         </div>
         <img src={image} alt="product" />
         <button onClick={addToBasket}>Add to Basket</button>
      </div>
   );
};

export default Product;
