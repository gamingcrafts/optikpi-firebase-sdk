STEP 1 

Include the optikpi tracker in your code base

  <script src="http://cdn.com/optikpi-tracker.js"></script>


STEP 2

Initialize optikpi message tracker
let message_tracker = new this.optikpi.MessageDeliveryTracker(
            "http://customer.optikpi.com",
            "apiKey"
          );


STEP3

Inside firebase onMesaage call the optikpi tracker


// [START receive_message]
      // Handle incoming messages. Called when:
      // - a message is received while the app has focus
      // - the user clicks on an app notification created by a service worker
      //   `messaging.setBackgroundMessageHandler` handler.
      messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        messaging.getToken().then((currentToken) => {
          
          message_tracker.updateMessageStatus(
            payload,
            currentToken,
            "Delivered"
          );
        });

        // [START_EXCLUDE]
        // Update the UI to include the received message.
        appendMessage(payload);
        // [END_EXCLUDE]
      });
      // [END receive_message]
