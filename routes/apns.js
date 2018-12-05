var apn = require('apn');

module.exports = {
  options : {
    gateway : "gateway.sandbox.push.apple.com",
    cert: './apns/keys/cert.pem',
    key: './apns/keys/key.pem'
  },
  push : function(token, noteJson) {
    if (!token || noteJson == null) {
      return;
    }

    var apnConnection = new apn.Connection(this.options);
    var myDevice = new apn.Device(token);
    var note = new apn.Notification();

    console.log("=== Start APNs Push ====");
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
