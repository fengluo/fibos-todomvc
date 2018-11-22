var fibos = require('fibos');

fibos.load("http", {
    "http-server-address": "0.0.0.0:8888",
    "access-control-allow-origin": "*"
});
fibos.load("chain", {
    "delete-all-blocks": true
});
fibos.load("net");
fibos.load("chain_api");
// fibos.load("history_api");
fibos.load("producer", {
    'producer-name': 'eosio',
    'enable-stale-production': true
});
fibos.config_dir = "start_fibos/fibos_config_dir/";
fibos.data_dir = "start_fibos/fibos_data_dir/";
fibos.enableJSContract = true;
fibos.start();
