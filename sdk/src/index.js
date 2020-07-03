/*jshint esversion: 8 */
export class MessageDeliveryTracker {
  constructor(ingestUrl, apiToken) {
    this.ingestUrl = ingestUrl;
    this.apiToken = apiToken;
    this.IDENTIFIER_TYPES = {
      PUSH: "optikpiPush",
      EMAIL: "optikpiEmail",
      SMS: "optikpiSMS",
    };
  }

  trackPushMessage(actionId, token, message) {
    return this.track(actionId, this.IDENTIFIER_TYPES.PUSH, token, message);
  }
  /**
   * actionId - ID of the optikpi Action
   * identifier - Push Token/EmailId/Phone Number
   * identifierType - optikpiPush/optikpiEmail/optikpiContact/optikpiKey
   * message - Any String, eg: Delivered, clicked, opened etc
   */

  track(actionId, identifierType, identifier, message) {
    return this.sendDeliveryStatus(
      actionId,
      identifierType,
      identifier,
      message
    );
  }

  async sendDeliveryStatus(actionId, identifierType, identifier, message) {
    const url = this.ingestUrl + "/ingest/optikpi/track/";
    //console.log("MESSAGE-DELIVERED", message, identifier);
    const trackerObj = {
      actionId,
      identifierType,
      identifier,
      message,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${this.apiToken}`,
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
