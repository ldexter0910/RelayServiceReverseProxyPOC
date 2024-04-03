require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Disables certificate verification

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

const uri = WebSocket.createRelaySendUri(ns, path);
// const proxiedAddr = WebSocket.createRelaySendUri("localhost", path);
const token = WebSocket.createRelayToken(uri, keyrule, key);

WebSocket.relayedConnect(
    uri,
    token,
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