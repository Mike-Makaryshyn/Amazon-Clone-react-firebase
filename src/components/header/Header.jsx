import React from "react";
import "./Header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

const Header = () => {
   const [{ basket }, dispatch] = useStateValue();

   return (
      <div className="header">
         <Link to="/">
            <img
               className="header__logo"
               src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
               alt="amazon-logo"
            />
         </Link>

         <div className="header__search">
            <input type="text" className="header__search-input" />
            <AiOutlineSearch className="header__search-icon" />
         </div>

         <div className="header__nav">
            <Link to="/login">
               <div className="header__option">
                  <span className="header__option-fl">Hello</span>
                  <span className="header__option-sl">Sign In</span>
               </div>
            </Link>
            <div className="header__option">
               {" "}
               <span className="header__option-fl">Returns</span>
               <span className="header__option-sl"> & Orders</span>
            </div>
            <div className="header__option">
               {" "}
               <span className="header__option-fl">Your</span>
               <span className="header__option-sl">Prime </span>
            </div>

            <Link to="/checkout">
               <div className="header__option-basket">
                  <MdShoppingBasket className="header__option-basket-icon" />
                  <span className="header__option-sl header__basket-count">
                     {basket?.length}
                  </span>
               </div>
            </Link>
         </div>
      </div>
   );
};

export default Header;
