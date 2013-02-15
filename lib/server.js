// Basic express server that will:
// - serve up the test pages
// - respond to ajax requets for templates or data
// - runs on port 8080

var express = require('express');
var routes  = require('./routes');
var mongo   = require('mongodb');

var server;
var dbConnection;

module.exports.start = function start() {
    
    // grab a mongo db connection first of all
    dbInit(function() {
        
        // now create and config the express server
        app = express();
        
        app.use(express.json);
        app.use(app.router());
        app.use(express.static(__dirname + '/public'));
        
        routes.initRoutes(app, db);
        
        app.listen(8080);
        console.log('App listening on 8080');
    
    });
};

// connect to a test db and set db to the active db instance
// or report error and die
var dbInit = function dbInit(cb) {
    
    server = new mongo.Server('localhost', 27017, {auto_reconnect : true});   
    dbConnection = new mongo.Db('bluntpeak', server, {safe : true});
    
    dbConnection.open(function(err, dbInstance) {
        if (err) {
            console.log('Err: '+err);
            process.exit();
        }
        
        db = dbInstance;
        cb();
    });
};