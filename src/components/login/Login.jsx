import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.css";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const history = useHistory();

   const signIn = (e) => {
      e.preventDefault();

      auth
         .signInWithEmailAndPassword(email, password)
         .then((auth) => {
            history.push("/");
         })
         .catch((err) => alert(err.message));
   };

   const register = (e) => {
      e.preventDefault();

      auth
         .createUserWithEmailAndPassword(email, password)
         .then((auth) => {
            console.log(auth);
            if (auth) {
               history.push("/");
            }
         })
         .catch((err) => alert(err.message));
   };

   return (
      <div className="login">
         <Link to="/">
            <img
               className="login__logo"
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
               alt="logo"
            />
         </Link>
         <div className="login__container">
            <h1>Sign-in</h1>

            <form>
               <h5>E-mail</h5>
               <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
               />
               <h5>Password</h5>
               <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
               />
               <button
                  onClick={signIn}
                  className="login__sign-in-btn"
                  type="submit"
               >
                  Sign In
               </button>
            </form>

            <p>
               By signing-in you agree to the AMAZON FAKE CLONE Conditions of
               Use & Sale. Please see our Privacy Notice, our Cookies Notice and
               our Interest-Based Ads Notice.
            </p>
            <button onClick={register} className="login__reg-btn">
               Create your Amazon Account
            </button>
         </div>
      </div>
   );
};

export default Login;
