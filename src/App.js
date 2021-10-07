import Header from './components/header/Header';
import Home from './components/home/Home';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Checkout from './components/checkout/Checkout';
import Login from './components/login/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './components/payment/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe("pk_test_51JhEAWLTkFC6KIea2CnaEDHrD4M7z5C5JLBGjtT8uVuDjrY3sZ64kbS9gEPlYu4nN958pnTSFTmp14v2ko4Uo1ea005q9ReajQ")

function App() {
   const [{ },dispatch] = useStateValue();

   useEffect(() => {
      auth.onAuthStateChanged(authUser => {
         console.log('user is ',authUser);

         if (authUser) {
            dispatch({
               type: 'SET_USER',
               user: authUser
            })
         } else {
            dispatch({
               type: 'SET_USER',
               user: null
            })
         }
      })
   },[])

   return (
      <Router>
         <div className="App">
            <Switch>
               <Route path="/login">
                  <Login />
               </Route>
               <Route path="/checkout">
                  <Header />
                  <Checkout />
               </Route>
               <Route path="/payment">
                  <Header />
                  <Elements stripe={promise}>
                     <Payment />
                  </Elements>
               </Route>
               <Route path="/">
                  <Header />
                  <Home />
               </Route>
            </Switch>
         </div>
      </Router>
   );
}

export default App;
