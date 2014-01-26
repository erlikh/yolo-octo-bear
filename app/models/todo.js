'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Todo Schema
 */
var TodoSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
TodoSchema.path('content').validate(function(content) {
    return content.length;
}, 'Content cannot be blank');

/**
 * Statics
 */
TodoSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Todo', TodoSchema);
