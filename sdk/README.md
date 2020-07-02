# OptiKPI Message Tracker SDK

## SDK usage
```javascript
const URL = 'https://company.optikpi.com';
const TOKEN = 'COMPANY_TOKEN'
let message_tracker =  optikpi.getMessageTracker(URL,TOKEN);
//After the message recieved
message_tracker.updateMessageStatus(messagePayload, userPushToken, "Delivered")
```   

### Usage in service worker

##### 1. Importing the library in service worker

Import the optikpi tracker in `firebase-messaging-sw.js`
```javascript
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js");

importScripts("./optikpi-tracker.js");
```
##### 2. Adding event listener
Add an event listener for `push` event in the `firebase-messaging-sw.js`

```javascript
addEventListener("push", (event) => {
  console.log("[Push Message Recieved in SW]", event.data.json());
});
```

##### 3. Getting the userToken from firebase
We use the firebase sdk to fetch the userToken to send to the `updateMessageStatus(payload,token,deliverStatus)`
```javascript
addEventListener("push", (event) => {
  console.log("[Push Message Recieved in SW]", event.data.json());
   messaging.getToken().then((currentToken) => {
    console.log("[User Token]",currentToken)''
  });
});
```

##### 4. Sending the delivery status to optikpi
Invoke the  `updateMessageStatus(payload,token,deliverStatus)` with the appropriate arguments
```javascript
addEventListener("push", (event) => {
  console.log("[Push Message Recieved in SW]", event.data.json());
  messaging.getToken().then((currentToken) => {
    message_tracker.updateMessageStatus(event.data.json(), currentToken, "Delivered");
  });
});
});
```

#### Final `firebase-messaging-sw.js` would look something like this
```javascript

importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);
importScripts("./optikpi-tracker.js");
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "API_KEY",
  authDomain: "company.firebaseapp.com",
  databaseURL: "https://optikpi.firebaseio.com",
  projectId: "project",
  storageBucket: "project.appspot.com",
  messagingSenderId: "21250sdf8461716",
  appId: "1:2125084d61716:web:1ea89ddaed73177453e4281",
  measurementId: "G-P327EdfdHDMLZ",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

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
let message_tracker = optikpi.getMessageTracker("https://company.optikpi.com","apiKey");
addEventListener("push", (event) => {
  console.log("[Push Message Recieved in SW]", event.data.json());

  messaging.getToken().then((currentToken) => {
    message_tracker.updateMessageStatus(event.data.json(),currentToken,"Delivered");
  });
});
//[END OPTKPI Push Message Tracking]
```