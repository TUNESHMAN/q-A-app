var firebase = require("firebase/app");
// This is the link between our code and firebase. It does the same job as dbConfig in a SQL structure.
var firebaseConfig = {
  apiKey: "AIzaSyB6vaKlANCatJJGVPjFb6V89grgbI7Uc2o",
  authDomain: "questionform-ed5f5.firebaseapp.com",
  databaseURL: "https://questionform-ed5f5.firebaseio.com",
  projectId: "questionform-ed5f5",
  storageBucket: "questionform-ed5f5.appspot.com",
  messagingSenderId: "384186672300",
  appId: "1:384186672300:web:c098bd5a0a3fead37f2b09",
};

// We initialize firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

// Grab our DOM elements
const submitBtn = document.querySelector("#go");
let topic = document.querySelector("#email");
let content = document.querySelector("password");

const db = firestore.collection("questionData");

// We add an event listener to the submit button
submitBtn.addEventListener("click", function () {
  let topicInput = topic.value;
  let contentInput = content.value;

  // Access the database collection
  db.doc()
    .set({
      topic: topicInput,
      content: contentInput,
    })
    .then(function () {
      console.log("Data Saved");
    })
    .catch((error) => {
      console.log(error);
    });
});
