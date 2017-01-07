import { warn } from './utils';
import EventTypes from './event/types';
import { defaultMapper } from './event/configuration';
import { extractIdentifyFields } from './event/identify';
import { extractPageFields } from './event/page';
import { extractTrackFields } from './event/track';
import { extractAliasFields } from './event/alias';
import { extractGroupFields } from './event/group';


function emit(type: string, fields: Array) {
  try {
    window.analytics[type](...fields);
  } catch (error) {
    warn(`Call to window.analytics[${ type }] failed. Make sure that the anaytics.js` +
         ` script is loaded and executed before your application code.\n`, error);
  }
}

function createTracker(customOptions = {}) {
  const options = {
    mapper: { ...defaultMapper.mapper, ...customOptions.mapper }
  };
  return store => next => action => handleAction(store.getState.bind(store), next, action, options);
}

function appendAction(action: Object, analytics: Object | Array) {

  action.meta = {
      ...action.meta,
      analytics: Array.isArray(analytics) ? analytics : { ...analytics }
  };

  return action;
}

function handleAction(getState: Function, next: Function, action: Object, options: Object) {

  if (action.meta && action.meta.analytics) return handleSpec(next, action);

  if (typeof options.mapper[action.type] === 'function') {

    let analytics = options.mapper[action.type](getState, action);
    return handleSpec(next, appendAction(action, analytics));
  }

  if (typeof options.mapper[action.type] === 'string') {

    let analytics = {eventType: options.mapper[action.type]};
    return handleSpec(next, appendAction(action, analytics));
  }

  return next(action);
}

function getFields(type: string, fields: Object, actionType: string) {
  const typeFieldHandlers = {
    [EventTypes.identify]: extractIdentifyFields,
    [EventTypes.page]: extractPageFields,
    [EventTypes.track]: eventFields => extractTrackFields(eventFields, actionType),
    [EventTypes.alias]: extractAliasFields,
    [EventTypes.group]: extractGroupFields,
    [EventTypes.reset]: () => [],
  };

  return typeFieldHandlers[type](fields);
}

function getEventType(spec) {
  if (typeof spec === 'string') {
    return spec;
  }

  return spec.eventType;
}

function handleIndividualSpec(spec: string | Object, action: Object) {
  const type = getEventType(spec);

  // In case the eventType was not specified or set to `null`, ignore this individual spec.
  if (type && type.length) {
    const fields = getFields(type, spec.eventPayload || {}, action.type);

    if (fields instanceof Error) return warn(fields);

    emit(type, fields);
  }
}

function handleSpec(next: Function, action: Object) {
  const spec = action.meta.analytics;

  if (Array.isArray(spec)) {
    spec.forEach(s => handleIndividualSpec(s, action));
  } else {
    handleIndividualSpec(spec, action);
  }

  return next(action);
}


export {
  createTracker,
  EventTypes,
};
