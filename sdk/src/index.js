/*jshint esversion: 8 */
export class MessageDeliveryTracker {
  constructor(ingestUrl, apiToken) {
    this.ingestUrl = ingestUrl;
    this.apiToken = apiToken;
  }

  updateMessageStatus(payload, token, goal) {
    const url = this.ingestUrl + "/ingest/firebase/webhook";
    console.log("MESSAGE-DELIVERED", payload, token);
    return this.sendDeliveryStatus(url, payload, token, goal);
  }

  async sendDeliveryStatus(url, payload, token, goal) {
    const trackerObj = {
      payload,
      token,
      goal
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackerObj),
      });
      return response.json();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
