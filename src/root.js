let __CONFIG__ = require('__CONFIG__');

if (__CONFIG__.thisENV === 'dev') {
  module.exports = require('./app');
}
/*
if (__CONFIG__.thisENV === 'test') 
{
  module.exports = require('./app.test');
}*/