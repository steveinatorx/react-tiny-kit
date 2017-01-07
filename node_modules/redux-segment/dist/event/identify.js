'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getIdentifyProperties(fields) {
  if (!fields.userId) return ['traits', 'options'];

  return ['userId', 'traits', 'options'];
}

function extractFields(obj, keys) {
  return keys.map(function (key) {
    return key === 'traits' ? obj[key] || {} : obj[key];
  });
}

function extractIdentifyFields(fields) {
  // all fields are optional for identify events
  if (!fields) {
    return [];
  }

  var props = getIdentifyProperties(fields);

  return extractFields(fields, props);
}

exports.extractIdentifyFields = extractIdentifyFields;