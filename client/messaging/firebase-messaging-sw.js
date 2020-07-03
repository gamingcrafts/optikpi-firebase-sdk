// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/7.15.0/firebase-app.js');
// importScripts('/__/firebase/7.15.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

// const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.**/

// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);
importScripts("./optikpi-tracker.js");
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAU7jpJWmTAWTLofQsjJoebRG2Ro6lW4Jk",
  authDomain: "optikpi.firebaseapp.com",
  databaseURL: "https://optikpi.firebaseio.com",
  projectId: "optikpi",
  storageBucket: "optikpi.appspot.com",
  messagingSenderId: "212508461716",
  appId: "1:212508461716:web:1ea89daed73177453e4281",
  measurementId: "G-P327EHDMLZ",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
// [END background_handler]

//[START OPTKPI Push Message Tracking]
let message_tracker = optikpi.getMessageTracker("http://localhost:4000",
"jwtToken");
addEventListener("push", (event) => {
  console.log("[Push Message Recieved in SW]", event.data.json());
  messaging.getToken().then((currentToken) => {
    message_tracker.updateMessageStatus(
      event.data.json().fcmOptions.analyticsLabel,
      currentToken,
      "Delivered"
    );
  });
});
//[END OPTKPI Push Message Tracking]
