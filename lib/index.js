"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactTinyFlux = function (_Component) {
  _inherits(ReactTinyFlux, _Component);

  function ReactTinyFlux() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactTinyFlux);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactTinyFlux.__proto__ || Object.getPrototypeOf(ReactTinyFlux)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      data: _immutable2.default.fromJS(_this.props.initial)
    }, _this.dispatch = function (action) {
      var asyncActions = _this.props.asyncActions;

      if (asyncActions[action.type]) {
        asyncActions[action.type](_this.state.data, action, _this.dispatch);
        return;
      }

      var data = _this.handleAction(_this.state.data, action);
      _this.setState({
        data: data
      });
    }, _this.handleAction = function (state, action) {

      var reducers = _this.actions;

      // action is an array
      if (action instanceof Array) {
        return action.reduce(function (state, action) {
          return _this.handleAction(state, action);
        }, state);
      }

      var type = action.type;
      if (!reducers[type]) {
        return state;
      }

      return reducers[type](state, action);
    }, _this.setState = _this.setState.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactTinyFlux, [{
    key: "render",
    value: function render() {
      return this.props.children({
        _state: this.state,
        state: this.state.data,
        setState: this.setState,
        dispatch: this.dispatch
      });
    }
  }]);

  return ReactTinyFlux;
}(_react.Component);

ReactTinyFlux.defaultProps = {
  initial: {},
  asyncActions: {},
  actions: {}
};
exports.default = ReactTinyFlux;