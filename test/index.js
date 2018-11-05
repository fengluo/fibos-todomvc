var FIBOS = require('fibos.js');
var config = require('../config');
var fs = require('fs');
var test = require('test');
test.setup();

describe(`todo`, () => {
    var fibosClient; 
    before(() => {
        fibosClient = FIBOS({
            chainId: config.client.chainId, // 32 byte (64 char) hex string
            keyProvider: config.client.keyProvider, 
            httpEndpoint: config.client.httpEndpoint,
            logger: {
                log: null,
                error: null
            }
        }); 
        fibosClient.newaccountSync({
            creator: 'eosio',
            name: config.testContract.name,
            owner: config.account.publicKey,
            active: config.account.publicKey,
        });
     // setcode
     const jsCode = fs.readTextFile('../contracts/todo.js');
     fibosClient.setcodeSync(config.testContract.name, 0, 0, fibosClient.compileCode(jsCode));
     
     // setabi
     const abi = JSON.parse(fs.readTextFile('../contracts/todo.abi'));
     fibosClient.setabiSync(config.testContract.name, abi);
    });
    it(`insert data`, () => {
        var ctx = fibosClient.contractSync(config.testContract.name);
        ctx.emplacetodoSync(1,"say something",0, {
            authorization: config.testContract.name
        });
        console.notice('fibos.getTableRowsSync(true, config.testContract.name, user1, todos)',
        fibosClient.getTableRowsSync(true, config.testContract.name, config.testContract.sender, 'todos'));
    });

    it(`find data`, () => {
        var ctx = fibosClient.contractSync(config.testContract.name);
        ctx.findtodoSync(1,{
            authorization: config.testContract.name
        })
        console.notice('fibos.getTableRowsSync(true, config.testContract.name, user1, todos)', 
        fibosClient.getTableRowsSync(true, config.testContract.name, config.testContract.sender, 'todos'));
    });

    it(`user modofy record`, () => {
        var ctx = fibosClient.contractSync(config.testContract.name);
        ctx.updatetodoSync(1,"done",1,{
            authorization: config.testContract.name
        })
        assert.isTrue(fibosClient.getTableRowsSync(true, config.testContract.name, config.testContract.sender, 'todos').rows.length === 1);
    });

    it(`user delete record`, () => {
        var ctx = fibosClient.contractSync(config.testContract.name);
        ctx.destorytodoSync(1,{
            authorization: config.testContract.name
        })
        assert.isTrue(fibosClient.getTableRowsSync(true, config.testContract.name, config.testContract.sender, 'todos').rows.length === 0);
    });
})

require.main === module && test.run(console.DEBUG);

