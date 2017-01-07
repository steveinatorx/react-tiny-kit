'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
function warn() {
  var ENV = typeof process !== 'undefined' && process.env.NODE_ENV || 'development';

  if (ENV === 'development' || ENV === 'test') {
    var _console;

    (_console = console).warn.apply(_console, arguments);
  }
}