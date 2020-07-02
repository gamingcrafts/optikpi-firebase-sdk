importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);
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

/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notification = JSON.parse(payload.data.notification);
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body,
        icon: notification.icon
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});