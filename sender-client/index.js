require('dotenv').config();

const WebSocket = require('hyco-ws');
const readline = require('readline')
    .createInterface({
        input: process.stdin,
        output: process.stdout
    });;

const ns = process.env.RelayNamespace;
const path = process.env.HybridConnectionName;
const keyrule = process.env.SASKeyName;
const key = process.env.SASKeyValue;

WebSocket.relayedConnect(
    WebSocket.createRelaySendUri(ns, path),
    WebSocket.createRelayToken('http://' + ns, keyrule, key),
    function (wss) {
        readline.on('line', (input) => {
            wss.send(input, null);
        });

        console.log('Started client interval.');
        wss.on('close', function () {
            console.log('stopping client interval');
            process.exit();
        });
    }
);