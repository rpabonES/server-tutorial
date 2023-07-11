/**
 * This directs all API management to the app.js file helping with separation of concerns.
 */


//Require express like so
const express = require('express');
const cloudinary = require('cloudinary').v2;

/**
 * This npm package enables us to handle incoming 
 * requests using req.body or request.body as the case may be. 
 */
const bodyParser = require('body-parser');


//Assign the express method to a constant like this
const app = express();

// cloudinary configuration
cloudinary.config({
    cloud_name:     'dhvp5pam7',
    api_key:        '336944792361291',
    api_secret:     '_i66GZRJyb2z5fOl-VcMqlL66Z0',

});



//* MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



// app.use((request, response) => {
//     response.json({
//         message: 'Hey! THis is your server response, we can',
//         data: [1,2,3,]
//     })
// });

app.get('/', (request, response) => {
    response-json({
       message: "Hey! This is your server response!" 
    });
});



// image upload API
/**
 * Basically, this is how we set up an API. The API makes a POST 
 * request to the server telling the server that the request 
 * should be handled with a degree of security. It uses two 
 * parameters to make this request: an end-point (/upload-image) 
 * and a callback function ((request, response) => {}).
 */
app.post("/upload-image", (request, response) => {
    // collecte image from an user
    const data = {
        image: request.body.image,
    }

    // upload image here
    /**
     * The upload function returns a promise. 
     * If the upload is successful, the promise's then 
     * block is executed with the result parameter, 
     * representing the response from Cloudinary.
     */
    cloudinary.uploader.upload(data.image)
    .then((result) => {
        /**
         * Here a 200 status code response is sent back to 
         * the client, along with a JSON payload containing
         * a "message" of "success" and the result object 
         * returned by Cloudinary.
         */
        response.status(200).send({
            message: "success",
            result,
        });
    }).catch((error) => {
        /**
         * If an error occurs during the upload, the catch block
         * is executed, and a 500 status code response is sent 
         * back to the client. The response JSON payload includes a 
         * "message" of "failure" and the error object representing 
         * the error that occurred.
         */
        response.status(500).send({
            message: "failure",
            error,
        });

    });


});

//Export the app constant to make it available for use in other files within the directory like so
module.exports = app;