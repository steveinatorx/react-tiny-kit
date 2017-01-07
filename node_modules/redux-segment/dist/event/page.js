'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function validatePageFields(fields) {
  if (fields.category && !fields.name) {
    return new Error('missing name field for EventTypes.page');
  }

  return null;
}

function getPageProperties(fields) {
  if (fields.category) return ['category', 'name', 'properties', 'options'];
  if (!fields.name) return ['properties', 'options'];

  return ['name', 'properties', 'options'];
}

function extractFields(obj, keys) {
  return keys.map(function (key) {
    return key === 'properties' ? obj[key] || {} : obj[key];
  });
}

function extractPageFields(fields) {
  // all fields are optional for page events
  if (!fields) {
    return [];
  }

  var err = validatePageFields(fields);
  if (err) return err;

  var props = getPageProperties(fields);

  return extractFields(fields, props);
}

exports.extractPageFields = extractPageFields;