/**
 * Module Dependencies
 */
const config = require('config');
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
const swagger = require('restify-swagger-jsdoc'); //For documentation
const Sequelize = require('sequelize');

/**
  * Initialize Server
  */
var server = restify.createServer(
    config.app
);

/**
 * Initialize Restify documentation
 */

swagger.createSwaggerPage({
        title: 'API documentation',
        version: '1.0.0',
        description: "Customer API Information",
    server: server, // created restify server object,
    //prefix: 'v1',
    path: '/api-docs', // url to view generated docs,,
    //apis: ['../api.yml'], // this is where swagger can find
    //apis: ['./test.yml'], // this is where swagger can find
    //definitions: ["./APIDefinition.yml"], // this is where you add definitions to swagger ( $ref: "#/definitions/AllContractors" )
    apis: ["./app/controllers/*.js"]        // this is where swagger can find
                                            // files containing jsdoc or can point
                                            // to api.yaml file
                                            // to generate docs from.
});

/**
  * Middleware
  */
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser(server.acceptable));
server.use(restify.plugins.bodyParser(server.acceptable));

/**
  * Start Server, Connect to DB & Require Routes
  */
server.listen(config.server.port, () => {
  // establish connection to mongodb
  //mongoose.Promise = global.Promise;
  //mongoose.connect(config.db.uri);
  //const db = mongoose.connection;
  var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        define: {
            paranoid: true
        }
  });

    sequelize.authenticate()
    .then(() => {
        require('./routes')(server);
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });
  /*sequelize.on('error', (err) => {
	  require('./routes')(server);
      console.log(`Server is listening on port ${config.server.port} but DB Connetion is not working, so server cannot get any real data`);
	  console.error('Reason that DB Failed is: ${err}');
  });
  sequelize.once('open', () => {
      require('./routes')(server);
      console.log(`Server is listening on port ${config.server.port}`);
  });*/

});
