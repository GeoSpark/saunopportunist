/**
 * Created by merseyviking on 12/09/14.
 */

var devices = {
    temperature: '00b465ae-640d-4a9e-99fc-ee11bfe4a476',
    proximity:   '6598546d-f647-4280-bf68-4210a0b82fa2'
};

var token = 'Bearer H1b3ut30GfZahmlU.CiKukBVl-kgv5Ia';

$(function() {
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
//              document.write(data);
                console.log(data);
                }
              });

        }
    });

});