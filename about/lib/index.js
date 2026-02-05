"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _style = require("./style");
var _reactTransitionGroup = require("react-transition-group");
var _commands = require("./commands");
var _utils = require("./utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Terminal = /*#__PURE__*/function (_PureComponent) {
  function Terminal(props) {
    var _this;
    _this = _PureComponent.call(this, props) || this;
    _defineProperty(_this, "historyCmdList", []);
    _defineProperty(_this, "historyCmdIndex", 0);
    _defineProperty(_this, "run", function (command, inputCommand) {
      if (inputCommand === void 0) {
        inputCommand = _this.state.command;
      }
      var cmd = _this.props.cmd;
      _this.setState({
        isPrinting: true
      });
      return cmd.dynamicList[command].run(_this.print, inputCommand).then(_this.print)["catch"](function (error) {
        console.error(error);
        _this.print(_commands.tipCmdList.error);
      })["finally"](function () {
        _this.setState({
          isPrinting: false
        });
      });
    });
    _defineProperty(_this, "print", function (cmd) {
      _this.setState(function (prevState) {
        return {
          cmdList: [].concat(prevState.cmdList, Array.isArray(cmd) ? cmd : [cmd])
        };
      });
      _this.autoScroll();
    });
    _defineProperty(_this, "inputFocus", function () {
      if (_this.$inputEl.current) {
        _this.$inputEl.current.focus();
      }
    });
    _defineProperty(_this, "autoScroll", function () {
      _this.$terminal.current.scrollTop = _this.$inputWrapper.current.offsetTop;
    });
    _defineProperty(_this, "handleKeyCommand", function (e) {
      var prompt = _this.props.config.prompt;
      var isDownKey = e.keyCode === 40;
      var isUpKey = e.keyCode === 38;
      var isTabKey = e.keyCode === 9;
      var isCKey = e.keyCode === 67;
      var isDKey = e.keyCode === 68;
      var isLKey = e.keyCode === 76;
      var isLeftKey = e.keyCode === 37;
      var isRightKey = e.keyCode === 39;
      var isCtrlCKey = isCKey && e.ctrlKey && !e.shiftKey;
      var isCtrlDKey = isDKey && e.ctrlKey && !e.shiftKey;
      var isCtrlLKey = isLKey && e.ctrlKey && !e.shiftKey;
      var _this$state = _this.state,
        command = _this$state.command,
        isPrinting = _this$state.isPrinting;
      if (isPrinting) {
        return;
      }
      if (isLeftKey || isRightKey) {
        var newPos = isLeftKey ? Math.max(0, _this.state.cursorPosition - 1) : Math.min(_this.state.command.length, _this.state.cursorPosition + 1);
        _this.setState({
          cursorPosition: newPos
        }, function () {
          (0, _utils.setCaretPosition)(_this.$inputEl.current, newPos);
        });
        e.preventDefault();
      }
      if (isDownKey) {
        _this.historyCmdIndex = Math.min(_this.historyCmdIndex + 1, _this.historyCmdList.length - 1);
      } else if (isUpKey) {
        _this.historyCmdIndex = Math.max(_this.historyCmdIndex - 1, 0);
      }
      if (isUpKey || isDownKey) {
        var historyCmd = _this.historyCmdList[_this.historyCmdIndex];
        if (historyCmd) {
          _this.setState({
            command: historyCmd,
            cursorPosition: historyCmd.length
          });
          setTimeout(function () {
            (0, _utils.setCaretPosition)(_this.$inputEl.current, historyCmd.length + 1);
          }, 0);
        }
      }
      if (isTabKey) {
        if (!command) {
          _this.setState({
            command: 'help'
          });
        }
        var canExtendCmdList = _this.allCmdList.filter(function (c) {
          return c.startsWith(command);
        });
        if (canExtendCmdList && canExtendCmdList.length) {
          _this.setState({
            command: canExtendCmdList[Math.floor(Math.random() * canExtendCmdList.length)]
          });
        }
        e.preventDefault();
      }
      if (isCtrlCKey) {
        _this.print("" + prompt + command);
        _this.setState({
          command: ''
        });
        e.preventDefault();
      }
      if (isCtrlDKey) {
        _this.print(_commands.tipCmdList.jump);
        e.preventDefault();
        window.history.go(-1);
      }
      if (isCtrlLKey) {
        _this.setState({
          cmdList: []
        });
        e.preventDefault();
      }
      _this.autoScroll();
      _this.inputFocus();
    });
    _defineProperty(_this, "updatePrompt", function (directory) {
      _this.setState({
        currentPrompt: "\u279C  " + directory + " ",
        directory: directory
      });
    });
    _defineProperty(_this, "handleCommand", function (e) {
      var _this$props = _this.props,
        cmd = _this$props.cmd,
        versionNumber = _this$props.config.version;
      var isEnterKey = e.keyCode === 13;
      if (!isEnterKey) {
        _this.handleKeyCommand(e);
        return;
      }
      if (!_this.state.command) {
        _this.print(_this.state.currentPrompt);
        return;
      }
      var command = _this.state.command.toLowerCase().trim();
      var _command$split = command.split(' '),
        action = _command$split[0],
        args = _command$split.slice(1);
      var commandArgs = args.join(' ');
      _this.historyCmdList.push(command);
      _this.historyCmdIndex = _this.historyCmdList.length;
      _this.print("" + _this.state.currentPrompt + command);
      var cmdList = [];
      var isStaticCommand = !!cmd.staticList[command];
      var isDynamicCommand = !!cmd.dynamicList[action];
      var exit = _commands.systemCmdList.exit,
        help = _commands.systemCmdList.help,
        clear = _commands.systemCmdList.clear,
        pwd = _commands.systemCmdList.pwd,
        cd = _commands.systemCmdList.cd,
        version = _commands.systemCmdList.version,
        date = _commands.systemCmdList.date,
        whoami = _commands.systemCmdList.whoami,
        history = _commands.systemCmdList.history,
        env = _commands.systemCmdList.env,
        echo = _commands.systemCmdList.echo,
        home = _commands.systemCmdList.home;
      var unknown = _commands.tipCmdList.unknown,
        jump = _commands.tipCmdList.jump,
        supporting = _commands.tipCmdList.supporting;
      if (exit.aliasList.includes(action)) {
        cmdList.push(jump);
        _this.print(cmdList);
        window.history.go(-1);
      } else if (help.aliasList.includes(action)) {
        if (commandArgs) {
          var _command = cmd.staticList[commandArgs] || cmd.dynamicList[commandArgs] || _commands.systemCmdList[commandArgs];
          if (_command) {
            cmdList.push({
              type: 'info',
              label: commandArgs,
              content: _command.content
            });
          } else {
            cmdList.push({
              type: 'error',
              label: 'Error',
              content: "No manual entry for " + commandArgs
            });
          }
          _this.print(cmdList);
        } else {
          cmdList.push(supporting);
          var allCommands = [].concat(Object.entries(_commands.systemCmdList).map(function (_ref) {
            var key = _ref[0],
              cmd = _ref[1];
            return {
              type: 'system',
              label: key,
              // eslint-disable-next-line react/prop-types
              content: cmd.content
            };
          }), _this.supportedCmdList.map(function (commandKey) {
            var command = cmd.staticList[commandKey] || cmd.dynamicList[commandKey];
            return {
              type: 'success',
              label: commandKey,
              content: command.description
            };
          }));
          cmdList.push.apply(cmdList, allCommands);
          _this.print(cmdList);
        }
      } else if (clear.aliasList.includes(action)) {
        _this.setState({
          cmdList: []
        });
      } else if (home.aliasList.includes(action)) {
        _this.print(jump);
        setTimeout(function () {
          window.location.href = '/';
        }, 500);
      } else if (pwd.aliasList.includes(action)) {
        _this.print(_this.state.directory);
      } else if (cd.aliasList.includes(action)) {
        if (commandArgs) {
          var directory = commandArgs.trim();
          if (directory && directory.length < 20) {
            _this.updatePrompt(directory);
          }
        }
      } else if (version.aliasList.includes(action)) {
        _this.print(versionNumber);
      } else if (date.aliasList.includes(action)) {
        _this.print(new Date().toString());
      } else if (whoami.aliasList.includes(action)) {
        _this.print('guest');
      } else if (history.aliasList.includes(action)) {
        _this.historyCmdList.forEach(function (cmd, index) {
          cmdList.push(index + 1 + "  " + cmd);
        });
        _this.print(cmdList);
      } else if (env.aliasList.includes(action)) {
        cmdList.push('TERM=react-terminal', 'SHELL=/bin/bash', 'USER=guest', 'PATH=/usr/local/bin:/usr/bin:/bin', "PWD=" + _this.state.directory, 'HOME=/home/guest');
        _this.print(cmdList);
      } else if (echo.aliasList.includes(action)) {
        var text = commandArgs.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, function (match, varName) {
          switch (varName) {
            case 'USER':
              return 'guest';
            case 'PWD':
              return _this.state.directory;
            case 'HOME':
              return '/home/guest';
            case 'SHELL':
              return '/bin/bash';
            case 'TERM':
              return 'react-terminal';
            case 'PATH':
              return '/usr/local/bin:/usr/bin:/bin';
            default:
              return match;
          }
        });
        _this.print(text || '');
      } else if (isStaticCommand) {
        _this.print(cmd.staticList[command].list);
      } else if (isDynamicCommand) {
        _this.run(action, commandArgs);
      } else if (action.trim()) {
        unknown.content = unknown.contentWithCommand(action);
        _this.print([unknown, help]);
      }
      _this.setState({
        command: ''
      });
      setTimeout(_this.autoScroll, 0);
      _this.inputFocus();
    });
    _this.$terminal = _react["default"].createRef();
    _this.$inputWrapper = _react["default"].createRef();
    _this.$inputEl = _react["default"].createRef();
    var config = props.config,
      _cmd = props.cmd;
    _this.state = {
      cmdList: [],
      command: '',
      directory: config.initialDirectory,
      currentPrompt: "\u279C  " + config.initialDirectory + " ",
      isPrinting: true,
      cursorPosition: 0,
      processes: [{
        pid: 1,
        name: 'system',
        status: 'running'
      }, {
        pid: 2,
        name: 'terminal',
        status: 'running'
      }]
    };
    _this.supportedCmdList = [].concat(Object.keys(_cmd.staticList), Object.keys(_cmd.dynamicList));
    _this.allCmdList = [].concat(_this.supportedCmdList, Object.keys(_commands.systemCmdList).map(function (key) {
      return _commands.systemCmdList[key].aliasList;
    }).flat(1));
    return _this;
  }
  _inheritsLoose(Terminal, _PureComponent);
  var _proto = Terminal.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;
    var bootCmd = this.props.config.bootCmd;

    // Add immediate focus
    setTimeout(function () {
      _this2.inputFocus();
    }, 100);
    this.run(bootCmd).then(function () {
      var help = _commands.systemCmdList.help,
        clear = _commands.systemCmdList.clear,
        exit = _commands.systemCmdList.exit,
        home = _commands.systemCmdList.home,
        invoice = _commands.systemCmdList.invoice;
      _this2.print([help, clear, exit, home, invoice]);
      _this2.inputFocus();
    });
  };
  _proto.render = function render() {
    var _this3 = this;
    var className = this.props.className;
    var _this$state2 = this.state,
      cmdList = _this$state2.cmdList,
      isPrinting = _this$state2.isPrinting,
      command = _this$state2.command,
      directory = _this$state2.directory,
      currentPrompt = _this$state2.currentPrompt,
      cursorPosition = _this$state2.cursorPosition;
    return /*#__PURE__*/_react["default"].createElement(_style.StyledTerminalWrapper, {
      className: className
    }, /*#__PURE__*/_react["default"].createElement(_style.StyledHeader, null, /*#__PURE__*/_react["default"].createElement(_style.StyledHeaderTitle, null, directory), /*#__PURE__*/_react["default"].createElement(_style.StyledHeaderDotList, null, /*#__PURE__*/_react["default"].createElement(_style.StyledHeaderDotItem, {
      color: "red",
      onClick: function onClick() {
        return window.location.href = '/';
      },
      style: {
        cursor: 'pointer'
      },
      title: "\u8FD4\u56DE\u9996\u9875"
    }), /*#__PURE__*/_react["default"].createElement(_style.StyledHeaderDotItem, {
      color: "yellow"
    }), /*#__PURE__*/_react["default"].createElement(_style.StyledHeaderDotItem, {
      color: "green"
    }))), /*#__PURE__*/_react["default"].createElement(_style.StyledTerminal, {
      ref: this.$terminal,
      onClick: this.inputFocus
    }, /*#__PURE__*/_react["default"].createElement(_style.StyledTerminalInner, null, /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.TransitionGroup, null, cmdList.map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.CSSTransition, {
        key: index,
        timeout: 500
      }, /*#__PURE__*/_react["default"].createElement(_style.StyledLine, null, typeof item === 'string' ? /*#__PURE__*/_react["default"].createElement(_style.StyledCommand, {
        className: "cmd"
      }, item) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, item.time && /*#__PURE__*/_react["default"].createElement(_style.StyledCommand, {
        className: "time"
      }, item.time), item.label && /*#__PURE__*/_react["default"].createElement(_style.StyledCommand, {
        className: item.type
      }, item.label), item.content && /*#__PURE__*/_react["default"].createElement(_style.StyledCommand, {
        className: "cmd"
      }, item.content))));
    })), /*#__PURE__*/_react["default"].createElement(_style.StyledInputWrapper, {
      ref: this.$inputWrapper,
      onClick: this.inputFocus
    }, isPrinting ? /*#__PURE__*/_react["default"].createElement(_style.StyledLoadingCursor, null, ".") : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_style.StyledPrompt, null, currentPrompt), /*#__PURE__*/_react["default"].createElement(_style.StyledCommand, null, command.slice(0, cursorPosition)), /*#__PURE__*/_react["default"].createElement(_style.StyledBlinkCursor, null, cursorPosition === command.length ? "\xA0" : command[cursorPosition] || "\xA0"), /*#__PURE__*/_react["default"].createElement(_style.StyledCommand, null, command.slice(cursorPosition + (cursorPosition === command.length ? 0 : 1)))), /*#__PURE__*/_react["default"].createElement(_style.StyledInput, {
      value: command,
      onChange: function onChange(e) {
        var newPos = e.target.selectionStart;
        _this3.setState({
          command: e.target.value,
          cursorPosition: newPos
        });
      },
      onKeyDown: this.handleCommand,
      onSelect: function onSelect(e) {
        _this3.setState({
          cursorPosition: e.target.selectionStart
        });
      },
      onFocus: function onFocus(e) {
        _this3.setState({
          cursorPosition: e.target.selectionStart
        });
      },
      autoFocus: true,
      ref: this.$inputEl
    })))));
  };
  return Terminal;
}(_react.PureComponent);
_defineProperty(Terminal, "defaultProps", {
  className: 'react-terimnal-app',
  config: {
    initialDirectory: 'src',
    prompt: '➜  ~ ',
    version: '1.0.0',
    bootCmd: 'intro'
  }
});
Terminal.propTypes = process.env.NODE_ENV !== "production" ? {
  cmd: _propTypes["default"].shape({
    dynamicList: _propTypes["default"].object,
    staticList: _propTypes["default"].object
  }).isRequired,
  config: _propTypes["default"].shape({
    initialDirectory: _propTypes["default"].string,
    prompt: _propTypes["default"].string,
    version: _propTypes["default"].string,
    bootCmd: _propTypes["default"].string
  }),
  className: _propTypes["default"].string
} : {};
var _default = exports["default"] = Terminal;
module.exports = exports.default;