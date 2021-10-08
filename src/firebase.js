import firebase from 'firebase';

const firebaseConfig = {
   apiKey: "AIzaSyBRUQikPy9SmkpTFyZooxTQ3Cc6lPwMLTA",
   authDomain: "clone-81844.firebaseapp.com",
   projectId: "clone-81844",
   storageBucket: "clone-81844.appspot.com",
   messagingSenderId: "641847497365",
   appId: "1:641847497365:web:842b39da3f317b7d4b019c"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db,auth };

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2021, 11, 7);
//     }
//   }
// }