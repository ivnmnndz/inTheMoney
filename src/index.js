import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXZeXdvn0c6sBNP8oT8wNf5zbjaZUtrkA",
    authDomain: "inthemoney-ee1ee.firebaseapp.com",
    projectId: "inthemoney-ee1ee",
    storageBucket: "inthemoney-ee1ee.appspot.com",
    messagingSenderId: "117221461869",
    appId: "1:117221461869:web:6ccdc6d3e96adc1f599464",
    measurementId: "G-ZYK9HPF7MP",
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  // onAuthStateChanged(auth, (user) => {
  //   if (user != null) {
  //     setCurrentUser(user);
  //     console.log("logged in");
  //     console.log("current user", currentUser);
  //   } else {
  //     console.log("no user");
  //   }
  // });

ReactDOM.render(<Layout />,
  document.getElementById('root')
);
