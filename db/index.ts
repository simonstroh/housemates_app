declare var require: Function
declare var module: {exports: any}

const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  database: 'postgres',
  password: 'password'
})

client.connect()

module.exports = client
