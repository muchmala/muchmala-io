var config = exports;

config.io = {
    externalHost: 'io.muchmala.dev',
    externalPort: 80,
    internalHost: '0.0.0.0',
    internalPort: null
};

config.queue = {
    host: "127.0.0.1",
    port: 6379,
    password: undefined,
    database: 0
};

var localConfigPath = __dirname + '/config.local.js';
if (require('path').existsSync(localConfigPath)) {
    var localConfig = require(localConfigPath),
        deepExtend = require('muchmala-common').misc.deepExtend;

    deepExtend(config, localConfig);
}
