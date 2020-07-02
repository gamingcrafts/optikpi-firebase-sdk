# OPTIKPI Push Tracking SDK

This repository contains the following apps

| Folder | Description |
| ------ | ------ |
| client/messaging | A end to end javascript implementation of sdk with firebase messaging. |
| sdk | Source code for the OPTIKPI Push tracking sdk. |
| tester | A utility app to send push messages to test tokens. |
| sample | A demo app to show how to create/fetch firebase push tokens. |

## Installation and Usage Instructions

### Client app

```cd client/messaging
firebase serve
firebase deploy```

### sdk

```cd sdk
npm install
npm run build```

### tester

```cd tester
npm install
node firebase-push.js```

### sample

```cd sample
node .```