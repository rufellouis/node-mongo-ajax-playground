// Basic express server that will:
// - serve up the test pages
// - respond to ajax requests templates or data
// - runs on port 8080

var express = require('express');
var routes  = require('./routes');
var mongo   = require('mongodb');
var path    = require('path');

var server;
var dbConnection;
var app;

module.exports.start = function start() {

    // grab a mongo db connection first of all
    dbInit(function(db) {

        // now create and config the express server
        app = express();

        // declare what middlewares we want to use.
        //
        // A middleware is just a fancy name for a self contained
        // function that can operate on an incoming request.
        //
        // Middleware can:
        // - ignore the request and leave it untouched
        //
        // - process the request without sending a response to the browser yet
        //
        // - process the request and send back a response (this is
        //   like a route app.get('/someurl, function ....)
        //
        // - middleware can either stop further processing of the
        //   request or pass the request to the next middleware after
        //   possibly processing it in some way.
        //
        // The order of app.use lines is important!
        //
        // express will arrange to pass all incoming requests to the first
        // middleware you define - express.logger in the case below.
        //
        // After this it is up to each middleware as to what happens to the
        // request next - see above.
        //
        app.use(express.logger());
        app.use(express.bodyParser());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, '..',  'public')));

        // setup our routes
        //
        // In this instance we have a routes.js file that controls the
        // definition of all our app routes.
        //
        // This is just one way to structure the code. You could, if you wanted,
        // simply include the routes inline within this function.
        //
        // e.g.
        //
        //  - app.post('urlforthisroute', function(req, res, next) {
        //      // do something with the req, res etc.
        //      res.json({someName : someValue});
        //    });
        //
        // But as you can imagine, this file will get a little long and hard
        // to maintain if we throw all of an applications routes and logic
        // right in here like that.
        //
        // So in this code we have chosen to place the routes into separate .js files
        // that are coordinated from routes.js with the following line.
        //
        // Note that we pass the app and db instances to the initRoutes function!
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
            console.log('MONGO ERROR: '+err);
            process.exit(100);
        }
        cb(dbInstance);
    });
};
