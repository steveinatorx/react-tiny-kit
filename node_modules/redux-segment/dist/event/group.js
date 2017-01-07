'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getGroupProperties() {
  return ['groupId', 'traits', 'options'];
}

function validateGroupFields(fields) {
  if (!fields.groupId) return new Error('missing groupId field for EventTypes.alias');

  return null;
}

function extractFields(obj, keys) {
  return keys.map(function (key) {
    return key === 'traits' ? obj[key] || {} : obj[key];
  });
}

function extractGroupFields(fields) {
  var props = getGroupProperties(fields);

  var err = validateGroupFields(fields);
  if (err) return err;

  return extractFields(fields, props);
}

exports.extractGroupFields = extractGroupFields;