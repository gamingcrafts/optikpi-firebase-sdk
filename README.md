# OptiKPI Push SDK Integration Guide

This guide provides step-by-step instructions to integrate the OptiKPI Push SDK into your HTML file.

## Steps

1. **Download Required Files**: Download `optikpi-push-sdk.js` and `optikpi-service-worker.js` and place them in your project directory.

2. **Add Script in HTML Body Tag**: Include the `optikpi-push-sdk.js` script in the body of your HTML file.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OptiKPI Push SDK Integration</title>
    </head>
    <body>
        <!-- Add your content here -->

        <script src="optikpi-push-sdk.js"></script>
        <script>
          const OPTIKPI_PUSH_KEY = 'OPTIKPI_PUSH_KEY';
          const OPTIKPI_CUSTOMER_ID = 'OPTIKPI_CUSTOMER_ID';
          window.optiKPIPushSDK = new PushSDK(OPTIKPI_PUSH_KEY, OPTIKPI_CUSTOMER_ID);
          window.optiKPIPushSDK.init();
        </script>
    </body>
    </html>
    ```

3. **Fill Variables and Initialize `PushSDK`**: Replace the placeholder values with your actual `OPTIKPI_PUSH_KEY`, `OPTIKPI_CUSTOMER_ID`. Pass these values to the `PushSDK` class and initialize it.

4. **Register Push Token During Login**: Call `window.optiKPIPushSDK.registerPushToken` during user login and pass the `userId` as an argument.

    ```javascript
    function login(userId) {
        // Your login logic here

        // Register push token
        window.optiKPIPushSDK.registerPushToken(userId);
    }
    ```

5. **Unregister Push Token During Logout**: Call `window.optiKPIPushSDK.unRegisterPushToken` during user logout and pass the `userId` as an argument.

    ```javascript
    function logout(userId) {
        // Your logout logic here

        // Unregister push token
        window.optiKPIPushSDK.unRegisterPushToken(userId);
    }
    ```

## Example

Here is a complete example of an HTML file with the OptiKPI Push SDK integration:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OptiKPI Push SDK Integration</title>
</head>
<body>
    <h1>Welcome to OptiKPI Push SDK Integration</h1>

    <script src="optikpi-push-sdk.js"></script>
    <script>
      const OPTIKPI_PUSH_KEY = 'OPTIKPI_PUSH_KEY';
      const OPTIKPI_CUSTOMER_ID = 'OPTIKPI_CUSTOMER_ID';
      window.optiKPIPushSDK = new PushSDK(OPTIKPI_PUSH_KEY, OPTIKPI_CUSTOMER_ID);
      window.optiKPIPushSDK.init();

      function login(userId) {
          // Your login logic here
          window.optiKPIPushSDK.registerPushToken(userId);
      }

      function logout(userId) {
          // Your logout logic here
          window.optiKPIPushSDK.unRegisterPushToken(userId);
      }
    </script>
</body>
</html>
