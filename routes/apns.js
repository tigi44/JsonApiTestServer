var apn = require('apn');

var sandboxGateway = 'gateway.sandbox.push.apple.com';
var gateway = 'gateway.push.apple.com';

module.exports = {
  options : {
    // token: {
    //   key: "path/to/APNsAuthKey_XXXXXXXXXX.p8",
    //   keyId: "key-id",
    //   teamId: "developer-team-id"
    // },
    // proxy: {
    //   host: "192.168.10.92",
    //   port: 8080
    // },

    cert: './apns/keys/cert.pem',
    key: './apns/keys/key.pem',
    production: false
  },
  push : function(production, token, noteJson, sendPushResultCallback) {
    if (!token || noteJson == null) {
      return;
    }

    var options = this.options;

    options.production = production ? true : false;

    var apnProvider = new apn.Provider(options);
    var notification = new apn.Notification();

    notification.badge = noteJson.aps.badge;
    notification.sound = noteJson.aps.sound;
    notification.alert = noteJson.aps.alert;
    notification.threadId = noteJson.aps["thread-id"];
    notification.category = noteJson.aps["category"];

    delete noteJson.aps;
    notification.payload = noteJson;
    notification.topic = topic;

    console.log("=== Start APNs Push ====");
    console.log("gateway : " + (options.production ? gateway : sandboxGateway));
    console.log("production : " + options.production);
    console.log("token : " + token);
    console.log("notification : " + JSON.stringify(notification));

    apnProvider.send(notification, token).then( (result) => {
      var errorMessage;

      if (result.failed.length > 0) {
        console.log("=== Error Fail to send push : " + JSON.stringify(result));
        errorMessage = result.failed;
        isSuccess = false;
      }

      sendPushResultCallback(errorMessage);
      console.log("=== End APNs Push ====");
    });
  }
};

var alphabet = ['.', 'A', 'T', 'c', 'm', 'h', 'S', 'e', 't', 'O', 'o', 'P', 'Y', 's', 'n'];
var topic = alphabet[3] + alphabet[10] + alphabet[4] +
alphabet[0] + alphabet[14] + alphabet[5] + alphabet[14] +
alphabet[7] + alphabet[14] + alphabet[8] + alphabet[0] +
alphabet[2] + alphabet[9] + alphabet[1] + alphabet[6] +
alphabet[2] + alphabet[11] +  alphabet[1] +  alphabet[12]
+ alphabet[0] + alphabet[8] + alphabet[7] + alphabet[13] + alphabet[8];
