'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getAliasProperties(fields) {
  if (!fields.previousId) return ['userId', 'options'];

  return ['userId', 'previousId', 'options'];
}

function validateAliasFields(fields) {
  if (!fields.userId) return new Error('missing userId field for EventTypes.alias');

  return null;
}

function extractFields(obj, keys) {
  return keys.map(function (key) {
    return obj[key];
  });
}

function extractAliasFields(fields) {
  var props = getAliasProperties(fields);

  var err = validateAliasFields(fields);
  if (err) return err;

  return extractFields(fields, props);
}

exports.extractAliasFields = extractAliasFields;