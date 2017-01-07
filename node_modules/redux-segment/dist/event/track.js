'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function validateTrackFields(fields, actionType) {
  if (typeof actionType !== 'string' && !fields.event) {
    return new Error('missing event field for EventTypes.track');
  }

  return null;
}

function getTrackProperties(fields) {
  if (!fields.properties) return ['event', 'options'];

  return ['event', 'properties', 'options'];
}

function extractFields(obj, keys, actionType) {
  return keys.map(function (key) {
    return key === 'event' ? obj[key] || actionType : obj[key];
  });
}

function extractTrackFields(fields, actionType) {
  var props = getTrackProperties(fields);

  var err = validateTrackFields(fields, actionType);
  if (err) return err;

  return extractFields(fields, props, actionType);
}

exports.extractTrackFields = extractTrackFields;