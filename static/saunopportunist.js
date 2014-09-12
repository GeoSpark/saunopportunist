/**
 * Created by merseyviking on 12/09/14.
 */

var devices = {
    temperature: '00b465ae-640d-4a9e-99fc-ee11bfe4a476',
    proximity:   '6598546d-f647-4280-bf68-4210a0b82fa2',
    grove: 'be8b305e-3414-4822-89ae-1c5d3bdf4fdb'
};

var token = 'Bearer H1b3ut30GfZahmlU.CiKukBVl-kgv5Ia';

var topic = '/v1/' + devices.grove + '/cmd';
var payload_on = {"down_ch_payload": [1, 1]};
var payload_off = {"down_ch_payload": [1, 0]};

$(function() {
//    var client = new Paho.MQTT.Client('mqtt.relayr.io', 1883, '', "client1");
//    var connected = false;

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
                    var sucks = JSON.parse(data);
                    console.log(sucks.temp);
                    $('#foo').text(sucks.temp);

//                    if (connected) {
//                        var message = null;
//                        if (sucks.temp >= 30.0) {
//                            message = new Paho.MQTT.Message(payload_on);
//                            message.destinationName = topic;
//                            client.send(message);
//                        } else {
//                            message = new Paho.MQTT.Message(payload_off);
//                            message.destinationName = topic;
//                            client.send(message);
//                        }
//                    }
                }
              });

        }
    });



    // set callback handlers
//    client.onConnectionLost = onConnectionLost;
//    client.onMessageArrived = onMessageArrived;
//
//    // connect the client
//    client.connect({onSuccess:onConnect, password: 'relayr', userName: 'relayr'});
//
//
//    // called when the client connects
//    function onConnect() {
//      // Once a connection has been made, make a subscription and send a message.
//      console.log("onConnect");
//      client.subscribe(topic, {});
//        connected = true;
//    }
//
//    // called when the client loses its connection
//    function onConnectionLost(responseObject) {
//      if (responseObject.errorCode !== 0) {
//        console.log("onConnectionLost:" + responseObject.errorMessage);
//      }
//    }
//
//    // called when a message arrives
//    function onMessageArrived(message) {
//      console.log("onMessageArrived:" + message.payloadString);
//    }

});