const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51JhEAWLTkFC6KIeaM8Yj680iWXR6gxg28jOOMMh6kZ7FVFryefZp8H5EsJqerhDWxwMnZsMPOYPKiOfQLkdKG6f200RiE5N5m7")

//API

//App config
const app = express();

//Middleware
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get('/',(request,response) => response.status(200).send('hi'))

app.post("/payments/create",async (request,response) => {
   const total = request.query.total;

   console.log("payment Request Recieved BOOM! for this amount >>>",total);

   const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
   });

   response.status(201).send({
      clientSecret: paymentIntent.client_secret,
   }) // OK-created
})

//Listen command 
exports.api = functions.https.onRequest(app)


//http://localhost:5001/clone-81844/us-central1/api