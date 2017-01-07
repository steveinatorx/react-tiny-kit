import EventTypes from './types';


const { page } = EventTypes;

const defaultMapper = {
  mapper: {
    '@@router/INIT_PATH': page,
    '@@router/UPDATE_PATH': page,
    '@@router/LOCATION_CHANGE': page,
    '@@reduxReactRouter/initRoutes': page,
    '@@reduxReactRouter/routerDidChange': page,
    '@@reduxReactRouter/replaceRoutes': page,
  },
};

export {
  defaultMapper,
};
