# OptiKPI Message Tracker
Tracks the optikpi action messages.

## Version: 1.0.0

### /track

#### POST
##### Summary

Updates the message status

##### Description

This api can be invoked from the client side to update the delivery status of optikpi messages.(Eg. delivered, clicked, opened etc)

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Message status updated |
| 400 | Invalid input, object invalid |
| 500 | Error |

#### Auth
Bearer type auth. `Authorization` header with value `JTW **YOUR_TOKEN**`

#### body

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| actionId | string | Optikpi ActionID | Yes |
| identifierType | string |One of {'PUSH','SMS','EMAIL','OPTIKPI_KEY'} | Yes |
| identifier | string | PUSH_TOKEN/PHONE_NUMBER/EMAIL/OPTIKPI_KEY (based on the indentifierType, if the identendifierType is 'PUSH', you supply a Push token here.) | Yes |
| message | string | Any Tracking message (Delivered/Opened/Clicked etc) | Yes |

#### CURL
```sh
curl --location --request POST 'https://company.optikpi.com/ingest/optikpi/tracker' \
--header 'Authorization: JWT **YOUR_JWT_TOKEN**' \
--header 'Content-Type: application/json' \
--data-raw '{
  "actionId":"Cool-Action",
  "identifierType":"optikpiPush",
  "identifier":"some-push-token",
  "message":"delivered"
}'
```
