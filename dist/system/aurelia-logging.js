'use strict';

System.register([], function (_export, _context) {
  var logLevel, loggers, currentLevel, appenders, slice, loggerConstructionKey, Logger;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function log(logger, level, args) {
    var i = appenders.length;
    var current = void 0;

    args = slice.call(args);
    args.unshift(logger);

    while (i--) {
      current = appenders[i];
      current[level].apply(current, args);
    }
  }

  function debug() {
    if (currentLevel < 4) {
      return;
    }

    log(this, 'debug', arguments);
  }

  function info() {
    if (currentLevel < 3) {
      return;
    }

    log(this, 'info', arguments);
  }

  function warn() {
    if (currentLevel < 2) {
      return;
    }

    log(this, 'warn', arguments);
  }

  function error() {
    if (currentLevel < 1) {
      return;
    }

    log(this, 'error', arguments);
  }

  function connectLogger(logger) {
    logger.debug = debug;
    logger.info = info;
    logger.warn = warn;
    logger.error = error;
  }

  function createLogger(id) {
    var logger = new Logger(id, loggerConstructionKey);

    if (appenders.length) {
      connectLogger(logger);
    }

    return logger;
  }

  return {
    setters: [],
    execute: function () {
      _export('logLevel', logLevel = {
        none: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4
      });

      _export('logLevel', logLevel);

      loggers = {};
      currentLevel = logLevel.none;
      appenders = [];
      slice = Array.prototype.slice;
      loggerConstructionKey = {};
      function getLogger(id) {
        return loggers[id] || (loggers[id] = createLogger(id));
      }

      _export('getLogger', getLogger);

      function addAppender(appender) {
        appenders.push(appender);

        if (appenders.length === 1) {
          for (var key in loggers) {
            connectLogger(loggers[key]);
          }
        }
      }

      _export('addAppender', addAppender);

      function setLevel(level) {
        currentLevel = level;
      }

      _export('setLevel', setLevel);

      _export('Logger', Logger = function () {
        function Logger(id, key) {
          _classCallCheck(this, Logger);

          if (key !== loggerConstructionKey) {
            throw new Error('Cannot instantiate "Logger". Use "getLogger" instead.');
          }

          this.id = id;
        }

        Logger.prototype.debug = function debug(message) {};

        Logger.prototype.info = function info(message) {};

        Logger.prototype.warn = function warn(message) {};

        Logger.prototype.error = function error(message) {};

        return Logger;
      }());

      _export('Logger', Logger);
    }
  };
});