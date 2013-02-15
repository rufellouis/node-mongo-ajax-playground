// central control to initialize all our route controllers
// each is passed a copy of the express app and dbInstance
//

module.exports.initRoutes = function initRoutes(app, db) {
    var ajaxRoutes = require('./controllers/ajaxRoutes')(app, db);
};
