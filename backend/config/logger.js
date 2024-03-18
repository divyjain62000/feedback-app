const winston = require('winston');

// Enable colors for the console transport
winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'cyan'
});

const logger = winston.createLogger({
    level: 'info', // Set the minimum logging level
    format: winston.format.combine(
        winston.format.colorize(), // Colorize the output
        winston.format.cli(), // Customize the output for the console
        winston.format.simple() // Specify the logging format
    ),
    transports: [
        new winston.transports.Console() // Log to console
    ]
});

module.exports = logger;
