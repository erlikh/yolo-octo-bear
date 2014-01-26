'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Task = mongoose.model('Task'),
    _ = require('lodash');


/**
 * Find task by id
 */
exports.task = function(req, res, next, id) {
    Task.load(id, function(err, task) {
        if (err) return next(err);
        if (!task) return next(new Error('Failed to load task ' + id));
        req.task = task;
        next();
    });
};

/**
 * Create a task
 */
exports.create = function(req, res) {
    var task = new Task(req.body);
    task.user = req.user;

    task.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                task: task
            });
        } else {
            res.jsonp(task);
        }
    });
};

/**
 * Update a task
 */
exports.update = function(req, res) {
    var task = req.task;

    task = _.extend(task, req.body);

    task.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                task: task
            });
        } else {
            res.jsonp(task);
        }
    });
};

/**
 * Delete an task
 */
exports.destroy = function(req, res) {
    var task = req.task;

    task.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                task: task
            });
        } else {
            res.jsonp(task);
        }
    });
};

/**
 * Show an task
 */
exports.show = function(req, res) {
    res.jsonp(req.task);
};

/**
 * List of Tasks
 */
exports.all = function(req, res) {
    Task.find().sort('-created').populate('user', 'name username').exec(function(err, tasks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(tasks);
        }
    });
};
