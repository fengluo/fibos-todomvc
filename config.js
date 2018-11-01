const config = {
    client: {
        chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
        httpEndpoint: 'http://127.0.0.1:8888',
        keyProvider: process.env.PRIVATE_KEY || '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
    },
    contract: {
        name: 'todo',
        sender: 'todo'
    },
    account: {
        publicKey: process.env.PUBLIC_KEY || 'FO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV',
        privateKey: process.env.PRIVATE_KEY || '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
    }
}

module.exports = config