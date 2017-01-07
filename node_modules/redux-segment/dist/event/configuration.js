'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMapper = undefined;

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var page = _types2.default.page;


var defaultMapper = {
  mapper: {
    '@@router/INIT_PATH': page,
    '@@router/UPDATE_PATH': page,
    '@@router/LOCATION_CHANGE': page,
    '@@reduxReactRouter/initRoutes': page,
    '@@reduxReactRouter/routerDidChange': page,
    '@@reduxReactRouter/replaceRoutes': page
  }
};

exports.defaultMapper = defaultMapper;