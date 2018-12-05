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
    var note = new apn.Notification();

    console.log("=== Start APNs Push ====");
    console.log("gateway : " + options.gateway);
    console.log("token : " + token);
    console.log("noteJson : " + JSON.stringify(noteJson));

    note.badge = noteJson.badge;
    note.sound = noteJson.sound;
    note.alert = noteJson.alert;
    if (noteJson.payload) {
      note.payload = noteJson.payload;
    }

    apnConnection.pushNotification(note, myDevice);

    console.log("=== End APNs Push ====");
  }
};
