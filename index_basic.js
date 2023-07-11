const http = require('http');
const app = require('./app');

// const server = http.createServer(( request, response) => {
//     /***
//      * In basic terms, the request object tells the server that 
//      * we want something, the response object tells us what the 
//      * server has to say about our request, and the end() method 
//      * terminates the communication with the server response.
//      */
//     response.end('Hey! This is your server Response!');
// });

const server = http.createServer(app);



const port = 3000;






app.set('port', port);



server.listen(port, () => {
    console.log(`Server listening on port ${3000}`);
});