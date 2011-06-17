var http = require('http'),
    opts = require('opts'),

    ioCluster = require('socket.io-cluster'),
    queueAdapter = require('muchmala-common').queueAdapter,

    config = require('./config');

var queue = new queueAdapter(config.queue);

opts.parse([
    {
        'short': 'H',
        'long': 'externalHost',
        'description': 'External HTTP host',
        'value': true,
        'required': false
    }, {
        'short': 'h',
        'long': 'internalHost',
        'description': 'Internal HTTP host',
        'value': true,
        'required': false
    }, {
        'short': 'P',
        'long': 'externalPort',
        'description': 'External HTTP port',
        'value': true,
        'required': false
    }, {
        'short': 'p',
        'long': 'internalPort',
        'description': 'Internal HTTP port',
        'value': true,
        'required': false
    }
], true);

var localConfig = {
    externalHost: opts.get('externalHost') || config.io.externalHost,
    externalPort: opts.get('externalPort') || config.io.externalPort,
    internalHost: opts.get('internalHost') || config.io.internalHost,
    internalPort: opts.get('internalPort') || config.io.internalPort
};

var host = localConfig.internalHost || localConfig.externalHost;
var port = localConfig.internalPort || localConfig.externalPort;

console.log(localConfig, host, port)
var server = http.createServer();
var ioNode = ioCluster.makeIoListener(server, {
        REDIS_HOST: config.queue.host,
        REDIS_PORT: config.queue.port,
        REDIS_PASSWORD: config.queue.password,
        REDIS_DATABASE: config.queue.database
    });

server.listen(port, host, function() {
    queue.broadcast('servers', {
            type: 'io',
            interface: localConfig
        });
});

ioNode.getClientInfo = function(client) {
    return {
        sessionId: client.sessionId,
        puzzleId: Object.keys(client.channels)[0],
        userId: client.userId
    };
};

ioNode.server.on('app setUserId', function(message) {
    var client = ioNode.socketIo.clients[message.recipients[0].id];
    if (client !== undefined) {
        client.userId = message.data.userId;
    }
});
