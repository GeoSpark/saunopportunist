/**
 * Created by merseyviking on 12/09/14.
 */

var appId='91d69733-4248-4d52-bf46-55e19e98c9a4';
var microphoneDeviceId='00b465ae-640d-4a9e-99fc-ee11bfe4a476';
var token = 'Bearer H1b3ut30GfZahmlU.CiKukBVl-kgv5Ia';

$(function() {
    $.ajax({
        url: "https://api.relayr.io/devices/"+ microphoneDeviceId + '/subscription',
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
              //Output the realtime data coming from the device
//              document.write(data);
                console.log(data);
                }
              });

        }
    });

});