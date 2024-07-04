const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Item API For Books',
            version: '1.0.0',
            description: 'A simple CRUD API application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // files containing annotations as per project
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};
