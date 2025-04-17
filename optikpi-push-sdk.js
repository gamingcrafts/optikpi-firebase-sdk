class PushSDK {
  subscription = null;

  constructor(
    optiKPIPushKey,
    originURL = "https://push.optikpi.com",
    serviceWorkerPath = "/optikpi-service-worker.js"
  ) {
    this.optiKPIPushKey = optiKPIPushKey;
    this.originURL = originURL;
    this.serviceWorkerPath = serviceWorkerPath;
  }

  async requestNotificationPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        return true;
      } else {
        console.warn("Notification permission denied.");
        return false;
      }
    } catch (error) {
      console.error("Failed to request notification permission:", error);
      return false;
    }
  }

  async registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          this.serviceWorkerPath
        );
        return registration;
      } catch (error) {
        console.error("Service Worker registration failed:", error);
        throw error;
      }
    } else {
      throw new Error("Service Workers are not supported in this browser.");
    }
  }

  async subscribeUser() {
    try {
      const registration = await this.registerServiceWorker();
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.optiKPIPushKey),
      });
      console.log("User is subscribed:");
      return subscription;
    } catch (error) {
      console.error("Failed to subscribe the user:", error);
      throw error;
    }
  }

  async sendSubscriptionToServer(subscription) {
    const response = await fetch(`${this.originURL}/storeSubscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });
    if (!response.ok) {
      throw new Error("Failed to send subscription to server.");
    }
    console.log("Subscription sent to server.");
    return await response.json();
  }

  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async init() {
    try {
      const hasRequestNotificationPermission =
        await this.requestNotificationPermission();
      if (hasRequestNotificationPermission) {
        this.subscription = await this.subscribeUser();
        await this.sendSubscriptionToServer(this.subscription);
      }
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }

  async registerPushToken(userId, customerId) {
    const url = `${this.originURL}/associatePlayer`;
    try {
      const registerResponse = await this.handleAPICallout(
        url,
        userId,
        customerId
      );
      console.log(" successfully associatePlayer");
      return registerResponse;
    } catch (err) {
      throw new Error("Failed to associatePlayer");
    }
  }

  async unRegisterPushToken(userId, customerId) {
    const url = `${this.originURL}/disassociatePlayer`;
    try {
      const unregisterResponse = await this.handleAPICallout(
        url,
        userId,
        customerId
      );
      console.log(" successfully disassociatePlayer");

      return unregisterResponse;
    } catch (err) {
      throw new Error("Failed to disassociatePlayer");
    }
  }

  async handleAPICallout(url, userId, customerId) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        subscription: this.subscription,
        workspaceId: customerId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to register push token");
    }
    return await response.json();
  }
}
