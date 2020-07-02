var admin = require("firebase-admin");

var serviceAccount = require("./optikpi-firebase-creds.json");

var c = "{\n  \"type\": \"service_account\",\n  \"project_id\": \"optikpi\",\n  \"private_key_id\": \"ea445bbd5fd72bd79001d36d93ed7fd00f9d4b0a\",\n  \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMGNrrsEBjeZg8\\nAST6NM3bN9neopK5nLGaYGQczHLryTJEJs/qggVNtE5KYN6BZelI5IdCk0BA/bn4\\nIIR7H/WIYp23Adg4H0rqbT5lHp6n2X9ZixVe5kp3v9Ljj+/eqWEhK6H/r6MAfwKO\\nFK5aChKJ/GBxPW+WSnLCOt5QkJNQpslPbi0WF83FE/Xb8u9Hmw9sFRjCvGED/Z3J\\n2vKsfflHQFxAFoxCPUAEJEjVImD/kntl/LQFTG67XQol0Kj8P6+lbpSpmS2lDbf3\\nWdCSo0yZBep5ESJDZfW0q+ki77Y07OSXzAzt79fBVjHVr8FzTtpdENJlQrw7Fjko\\nGiGGKAS7AgMBAAECggEAA1EQFa5qjXNHZwo5uJstETfqIXUQ31VNiY2xcspbv7so\\nRvU+gbgVL/sTHqBOXVnznYyhKhLMg4HcCM02ee2+BrZbi8LK6baQeBjIX8pMl7uw\\nFxtsgHtLkICcg7guFLc57dkQq+AFzRdDSl3Jq4roXDeutYhjDNUu4jskq7h9vFzC\\nEMty4+2xbkWYgpTL/tWjo2j6w5+2f9uvwN1u9hIPYCJ/THbfHbtHuRh06EF0v4IX\\n4y3bsZK6tRtN+ZUzHYZRgsEs7V3PoZwhoAqr9BoyKCv1O4rQLG7ft1vBcLNjVH5i\\nNbrDu2a40qNCSx2PrrlpEDpRkPMOfUJcR6Zd7kyUyQKBgQDmkrny79eZGwvM7zPL\\nkkzzPj/c+130HM8/GleL+c9mUk4OiHP0NymDA6Ia47ieBmfnyx531TqWQqZpetu/\\nX9Ioh+o23OyHEdxeGtHVOnmyGUeHZoGCHXE9lTOf83fpUPAuTU9yX2Laba0TXDGc\\nnAlTu9CkSHCTaTVzqlW63nzabQKBgQDimq/54OHkYx1dhkXaAGPe3xTkIxPhG4nO\\nU+KhtY+y4UQq30GVQRD8IWWS+Ev0QkdTmXysVuishbDWx4T4VxhtIx8BH+hDre54\\nWPlws7WuHxXJWi6VCCNQ8ipz3NHvDWaMcDtZ2x8VhK12XK6/kvuKkBebLbzmpACc\\nn/xE157ixwKBgCVEuBulWsLblUe1rjiMWDXE7Qup8aDAe1smxdnRMg3G5ekBc0SZ\\nGfOcRbp07mVUgbz8ntsdsw+QjFdmTVicg1qbxWbCxNR8NZNcYGhHwF3iKiafkfVX\\nDvO2Rxbmgo5Kz9ecFWhWNKM7sQr9DuPScMuBAxNaxh99lO8yLBM9XQ7tAoGBAK4s\\nIZiZ3mbSO+731tbSN/FFXGRiBdSfexOI7IhI6nOeq+ucAGe9RFXXQaBuksri6rn6\\nHpbEkkCQ3bSoVK8hGphAR4Nwx/DFTqdYFBopNzrnj7JdS7KnN6XvDOxTTVVF4o2N\\nckEFqGW8vitc38BGNGtzh4Fx7WEFq6a3XYp4hRpfAoGAVHxyzb5FmBIq+L3JQRvn\\nodgI8WdyYr5fDCUFs9FNu/yISSSkCpG6reGeM7axQmNlIXuu3kWMmMrkBztC1g0V\\nTzKqcjDCpKEbANvzmRa+RtxNjhikXAhsRKErum5jmIGBMW/VMXZu+L+/eVPPxB41\\nUHxwtKoImVTHcmMc7KgNCJc=\\n-----END PRIVATE KEY-----\\n\",\n  \"client_email\": \"firebase-adminsdk-qdn2p@optikpi.iam.gserviceaccount.com\",\n  \"client_id\": \"100677473518481756118\",\n  \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n  \"token_uri\": \"https://oauth2.googleapis.com/token\",\n  \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n  \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qdn2p%40optikpi.iam.gserviceaccount.com\"\n}\n"
var service_object = JSON.parse(c);
console.log(service_object);
let app;
if(!app){
  console.log("no")
}
 app = admin.initializeApp({
  credential: admin.credential.cert(service_object),
});
if(app){
  console.log("yes")
}

console.log(admin.apps);
var messaging = app.messaging();

const firefox_local = 'fYIBCY7CH6uJwmpw2nAAlv:APA91bGAQhhMhoLksCEyYeLRxyIod6z1KDiRWvnHv0o9S6yfr-0IgkZaYK8RDsoSdW-Rv9XIs4oT-o40oi1vNCu8yqeXAYb86Gii6XhsRZUfixQT0KOgWOrV6-T0BJtpcrM_5oNvqyv1'
const chrome_web = 'dkKERxLD2bGQ9h0FNdyz4T:APA91bGk0w8CfaZq9pyPyiDtww6BPMGsDGVx3VB5cgaj08RXpCtdwRfI48T3jXZyJ3bFwnihZrQXB-pKsgLqlSVdxJtvgEyx3aLJjTXxjNaqcvqfZXSFa01R5G6VJYZK7I01n4I6S_9K'
const chrome_local='eiHrJDATHbonwmPlUUXKqg:APA91bGOxuyxWlgaQsfvvSJBWo9SD341XANT5Zgr4KKoP8jCPlSZRyzxqXcMpaIsrpcnoaCK3Mp_rExTCMFgO3kzknXv8zdee4vVGGLJeCQ1sI1Jqxrup8PSTzPmrYKFZ7hwdXvBpb-n'
const firefox_web='cQXekUHrHT5DbaVbuLR3Ac:APA91bGueAJeuR_CtmjP0dC-w0vBLoKjoFc7MFI86GU1mcBXWtRDESiXWbc8q8VCCYLn6xK4Bq1iRzqS8xBsqBdVtLq8-G7pXtZ5ncXaKAXUVcMXa8sHHkUSkTKld151OH9QXze_LNoc'
const messageOne = {
  token:chrome_local,
  notification: {
    title: "Notification 1",
    body: "Notification 1 Body",
  },
  fcmOptions: {
    analyticsLabel: "firebase-web-action",
  },
};
const messageTwo = {
  token:firefox_web,
  notification: {
    title: "Chrome Notification 2",
    body: " Chrome Notification 2 Body",
  },
  data:{
    actionId:'actionOne',
    token:'dkKERxLD2bGQ9h0FNdyz4T:APA91bGk0w8CfaZq9pyPyiDtww6BPMGsDGVx3VB5cgaj08RXpCtdwRfI48T3jXZyJ3bFwnihZrQXB-pKsgLqlSVdxJtvgEyx3aLJjTXxjNaqcvqfZXSFa01R5G6VJYZK7I01n4I6S_9K'
  },
  fcmOptions: {
    analyticsLabel: "chrome-web-action",
  },
};
const messages = [messageOne, messageTwo];

messaging
  .sendAll(messages)
  .then((res) => {
    console.log(res);
    return;
  })
  .catch((err) => console.log(err));
