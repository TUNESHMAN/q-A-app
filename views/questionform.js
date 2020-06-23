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
  const form = document.querySelector("form");
  let topic = document.querySelector("#email");
  let content = document.querySelector("#password");
  // We add an event listener to the submit button
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let topicInput = topic.value;
    let contentInput = content.value;
    // Access the database collection
    firestore
      .collection("test")
      .add({
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