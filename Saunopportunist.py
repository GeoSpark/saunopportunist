from flask import Flask, render_template, request

import paho.mqtt.client as mqtt


app = Flask(__name__)
mqttc = None

devices = {
    'temperature': '00b465ae-640d-4a9e-99fc-ee11bfe4a476',
    'proximity': '6598546d-f647-4280-bf68-4210a0b82fa2',
    'grove': 'be8b305e-3414-4822-89ae-1c5d3bdf4fdb'
}

topic = '/v1/' + devices['grove'] + '/cmd'
payload_on = '{"down_ch_payload": [1, 1]}'
payload_off = '{"down_ch_payload": [1, 0]}'


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/light')
def toggle():
    light_on = request.values['on']

    if light_on != 'False':
        mqttc.publish(topic, payload_on, 0, False)
    else:
        mqttc.publish(topic, payload_off, 0, False)


def on_connect():
    pass

if __name__ == '__main__':
    mqttc = mqtt.Client(client_id='client1')
    mqttc.username_pw_set('relayr', 'relayr')
    mqttc.on_connect = on_connect
    mqttc.connect('mqtt.relayr.io', 1883, 60)
    # mqttc.subscribe(topic, 0)

    mqttc.loop_start()

    app.run()
