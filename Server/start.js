var Server = require("./server");
var firebase = require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyAzD2C5_Xk1jih7kv3P4KCEnaD3iOcsKlM",
    authDomain: "test-8b1d8.firebaseapp.com",
    databaseURL: "https://test-8b1d8.firebaseio.com",
    projectId: "test-8b1d8",
    storageBucket: "test-8b1d8.appspot.com",
    messagingSenderId: "814106028320"
});

new Server(8080, firebase).start();