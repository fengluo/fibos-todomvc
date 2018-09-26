const FIBOS = require('fibos.js');
const config = require('../config');
// new FIBOS client
const fibosClient = FIBOS(config.client);
const fs = require('fs');

// create account
const user = fibosClient.getAccountSync('todo');
if (!(user.account_name && user.account_name === 'todo')){
    fibosClient.newaccountSync({
        creator: 'eosio',
        name: "todo",
        owner: config.account.publicKey,
        active: config.account.publicKey
    });
}

//setcode
const js_code = fs.readTextFile('contracts/todo.js');
fibosClient.setcodeSync(config.contract.name, 0, 0, fibosClient.compileCode(js_code));

//getcode
const code = fibosClient.getCodeSync(config.contract.name, true);
console.log('code:', code);

//setabi
const abi = JSON.parse(fs.readTextFile('contracts/todo.abi'));
fibosClient.setabiSync(config.contract.name, abi);