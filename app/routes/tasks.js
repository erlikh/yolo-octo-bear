'use strict';

// Articles routes use tasks controller
var tasks = require('../controllers/tasks');
var authorization = require('./middlewares/authorization');
var passport = require('passport');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.task.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/tasks', authorization.requiresLogin, tasks.all);
    app.post('/tasks', authorization.requiresLogin, tasks.create);
    app.get('/tasks/:taskId', authorization.requiresLogin, hasAuthorization, tasks.show);
    app.put('/tasks/:taskId', authorization.requiresLogin, hasAuthorization, tasks.update);
    app.del('/tasks/:taskId', authorization.requiresLogin, hasAuthorization, tasks.destroy);


    //TODO(NE): find easier way to switch the Passport strategies
    app.get('/api/tasks',         passport.authenticate('basic', { session: false }), tasks.all);
    app.post('/api/tasks',        passport.authenticate('basic', { session: false }), tasks.create);
    app.get('/api/tasks/:taskId', passport.authenticate('basic', { session: false }), hasAuthorization, tasks.show);
    app.put('/api/tasks/:taskId', passport.authenticate('basic', { session: false }), hasAuthorization, tasks.update);
    app.del('/api/tasks/:taskId', passport.authenticate('basic', { session: false }), hasAuthorization, tasks.destroy);


    // Finish with setting up the taskId param
    app.param('taskId', tasks.task);

};
