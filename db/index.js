var Client = require('pg').Client;
var client = new Client({
    user: 'postgres',
    database: 'postgres',
    password: 'password'
});
client.connect();
module.exports = client;
