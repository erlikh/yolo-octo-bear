'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Task Schema
 */
var TaskSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        trim: true
    },
    priority: {
        type: Number
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
TaskSchema.path('content').validate(function(content) {
    return content.length;
}, 'Content cannot be blank');

TaskSchema.path('priority').validate(function(priority) {
    return [0, 1, 2].indexOf(priority) !== -1;
}, 'Priority should be in [0, 1, 2]');

/**
 * Statics
 */
TaskSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Task', TaskSchema);
