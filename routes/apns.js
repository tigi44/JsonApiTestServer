var apn = require('apn');

var sanbaxGateway = 'gateway.sandbox.push.apple.com';
var gateway = 'gateway.push.apple.com';

module.exports = {
  options : {
    gateway : sanbaxGateway,
    cert: './apns/keys/cert.pem',
    key: './apns/keys/key.pem'
  },
  push : function(production, token, noteJson) {
    if (!token || noteJson == null) {
      return;
    }

    var options = this.options;

    options.gateway = production ? gateway : sanbaxGateway;

    var apnConnection = new apn.Connection(options);
    var myDevice = new apn.Device(token);
    var notification = new apn.Notification();

    notification.badge = noteJson.aps.badge;
    notification.sound = noteJson.aps.sound;
    notification.alert = noteJson.aps.alert;
    delete noteJson.aps;
    notification.payload = noteJson;

    console.log("=== Start APNs Push ====");
    console.log("gateway : " + options.gateway);
    console.log("token : " + token);
    console.log("notification : " + JSON.stringify(notification));

    apnConnection.pushNotification(notification, myDevice);

    console.log("=== End APNs Push ====");
  }
};
