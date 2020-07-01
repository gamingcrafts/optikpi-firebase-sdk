This repository has the sdk, client side app and the tester code for firebase push notification tracking.


1. Client app
cd client/messaging
firebase serve
firebase deploy

2. sdk
cd sdk
npm install
npm run build

3. tester
cd tester
npm install
node firebase-push.js