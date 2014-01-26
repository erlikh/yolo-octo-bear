'use strict';

// Articles routes use tasks controller
var tasks = require('../controllers/tasks');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.tasks && req.tasks[0] && req.tasks[0].user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }

    if (req.task && req.task.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/tasks', authorization.requiresLogin, hasAuthorization, tasks.all);
    app.post('/tasks', authorization.requiresLogin, tasks.create);
    app.get('/tasks/:taskId', tasks.show);
    app.put('/tasks/:taskId', authorization.requiresLogin, hasAuthorization, tasks.update);
    app.del('/tasks/:taskId', authorization.requiresLogin, hasAuthorization, tasks.destroy);

    // Finish with setting up the taskId param
    app.param('taskId', tasks.task);

};
