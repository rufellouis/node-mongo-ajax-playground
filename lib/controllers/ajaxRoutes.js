// routes for handling ajax requests
//

var app;
var db;

module.exports = function(app, db) {

    // cache app and db for access by route functions
    this.app = app;
    this.db = db;
    
    // Route Naming Conventions
    //
    // I like to prefix API style routes with /ep to indicate they are an
    // API End Point (ep). You can in fact call the route path anything you
    // like.
    // 
    // Adopting a naming convention for all your routes, not just those handling
    // API requests, is highly reccomended.
    //
    // It make your life easier and the code cleaner.
    //
    // It also helps to adopt the same naming conventions, where possible,
    // across all projects so muscle memory will save you time when returning
    // to code you wrote a while ago. No more 'now how did I di that again?'
    
    // Splitting handler function from route definition
    //
    // Declare all routes at the start of a 'controller' file and supply a 
    // reference to the actual handler function rather than use an inline function.
    //
    // This makes it very easy to immediatly see what routes are being handled
    // within a given file and what HTTP verb they respond on as well.
    //
    // This kind of self documenting code is a lot easier to maintain.
    //
    // e.g.
    //
    // - app.get('/ep/some_api_path',       someHandlerFunction)
    // - app.post('/ep/some_api_path',      somePostHandlerFunction)
    
    // - app.get('/ep/some_other_api_path', someOtherHandlerFunction)
    //
    // rather than:
    //
    // - app.get('/ep/some_api_path', function(req, res, next) {
    //
    //      ... possibly
    //          long and complex
    //              handler logic
    //              goes here ...
    //
    //   });
    //
    // - app.post('/ep/some_api_path', function(req, res, next) {
    //
    //      ... possibly
    //          long and complex
    //              handler logic
    //              goes here ...
    //
    //   });
    //
    //
    // As you can see, even with the short example above, using inline functions
    // makes the code harder to comprehend at a glance. Now add in 20-30 lines 
    // of callback driven handler logic per function and things get messy real fast.
    
    app.post('/ep/grabjsondata', grabJsonData);

};

// simple function to return a static JSON object as route response
var grabJsonData = function grabJsonData(req, res, next) {

    var videoObject = {
        id     : 'vid01',
        title  : 'Erin Brockovich',
        length : 98,
        views  : 1203
    };

    // res.json is just a shortcut for setting up the content-type, length and
    // so on for returning a JSON formatted response.
    res.json(videoObject);
};
