/**
 * Secure the Server and Make it Future-Proof
 */

const http = require('http');
const app = require('./app');

const normalizePort = val => {
    /**
     * Returns a valid port, whether it is provided as a number or as a string
     */
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port;
    }

    return false;
};

/**
 * process.env.PORT makes the app dynamic so that it can run any port
 * assigned to it in the future when hosted on a live server
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    /**
     * Checks for various errors and handles them aproppriately
     * it is then registered to the server
     */
    if (error.syscall !== 'listen'){
        /**
         * verifies if the error is related to the listen system call, 
         * which is used to start the server. If it's not a listen error, 
         * the function throws the error, indicating that it should be 
         * handled elsewhere in the code.
         */
        throw error;
    }
    const address = server.address();
    /**
     * The bind var: If it's a string, it prepends the word "pipe" to the address. 
     * Otherwise, it assumes the address is a port number and prefixes it with "port".
     */
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES': //it indicates a permissions-related error.
            console.error(bind + ' requires elevated privileges.');
            process.exit(1); //Process exited with a status code of error
            break;
        case 'EADDRINUSE': // it means that the specified address is already in use
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            /**
             * If the error code does not match any of the above cases, 
             * it implies an unhandled error, so the function throws 
             * the error again to be handled elsewhere.
             */
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    /**
     * A listening event is also registered, logging the port or named pipe
     * on which the server is running to the consle
     */
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);