import firebase from "firebase"

require('@firebase/firestore')

 
  var firebaseConfig = {
    apiKey: "AIzaSyAow1xulZTvmxvyPFetsiM2yMSGJkWNS1o",
    authDomain: "booksanta-17d3b.firebaseapp.com",
    projectId: "booksanta-17d3b",
    storageBucket: "booksanta-17d3b.appspot.com",
    messagingSenderId: "666433697620",
    appId: "1:666433697620:web:9d59b99496d7e22b19fac1"
                       };
 
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()