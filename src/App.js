import Header from './components/header/Header';
import Home from './components/home/Home';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Checkout from './components/checkout/Checkout';
import Login from './components/login/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './components/payment/Payment';

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
                  <Payment />
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
