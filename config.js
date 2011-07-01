var config = exports;

config.io = {
    externalHost: process.env.MUCHMALA_IO_EXTERNAL_HOST || 'io.muchmala.dev',
    externalPort: process.env.MUCHMALA_IO_EXTERNAL_PORT || 80,
    internalHost: process.env.MUCHMALA_IO_INTERNAL_HOST || '0.0.0.0',
    internalPort: process.env.MUCHMALA_IO_INTERNAL_PORT || null
};

config.queue = {
    host: process.env.MUCHMALA_QUEUE_HOST || '127.0.0.1',
    port: process.env.MUCHMALA_QUEUE_PORT || 6379,
    password: process.env.MUCHMALA_QUEUE_PASSWORD || undefined,
    database: process.env.MUCHMALA_QUEUE_DATABASE || 0
};
