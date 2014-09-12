/**
 * Created by merseyviking on 12/09/14.
 */

var devices = {
    temperature: '00b465ae-640d-4a9e-99fc-ee11bfe4a476',
    proximity:   '6598546d-f647-4280-bf68-4210a0b82fa2',
    grove: 'be8b305e-3414-4822-89ae-1c5d3bdf4fdb'
};

var token = 'Bearer H1b3ut30GfZahmlU.CiKukBVl-kgv5Ia';

$(function() {
    var client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
    var connected = false;

    $.ajax({
        url: "https://api.relayr.io/devices/"+ devices.temperature + '/subscription',
        type: 'post',
        headers: {
          "Authorization": token
        },
        dataType: 'application/json',
        complete: function (credentials) {
            console.log(credentials.responseText);
            var cred = JSON.parse(credentials.responseText);

              var pubnub = PUBNUB.init({
                ssl: true,
                subscribe_key : cred.subscribeKey,
                cipher_key: cred.cipherKey,
                auth_key: cred.authKey
              });

            pubnub.subscribe({
                channel : cred.channel,

                message : function(data) {
                    console.log(data);

                    if (connected) {
                        if (data.temp >= 60.0) {
                            var message = new Paho.MQTT.Message("Hello");
                            message.destinationName = "/World";
                            client.send(message);
                        } else {
                            var message = new Paho.MQTT.Message("Hello");
                            message.destinationName = "/World";
                            client.send(message);
                        }
                    }
                }
              });

        }
    });



    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({onSuccess:onConnect});


    // called when the client connects
    function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      client.subscribe("/World");
        connected = true;
    }

    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    // called when a message arrives
    function onMessageArrived(message) {
      console.log("onMessageArrived:" + message.payloadString);
    }

});