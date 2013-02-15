// routes for handling ajax requests
//

var app;
var db;

module.exports = function(app, db) {

    // cache app and db for access by route functions
    this.app = app;
    this.db = db;
    
    app.post('/ep/grabjsondata', grabJsonData);

};

var grabJsonData = function grabJsonData(req, res, next) {

    var videoObject = {
        id     : 'vid01',
        title  : 'Erin Brockovich',
        length : 98,
        views  : 1203
    };

    res.json(videoObject);
};
