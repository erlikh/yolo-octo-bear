'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Todo = mongoose.model('Todo');

//Globals
var user;
var todo;

//The tests
describe('<Unit Test>', function () {
    describe('Model Article:', function () {
        beforeEach(function (done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function () {
                todo = new Todo({
                    content: 'Todo Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function () {
            it('should be able to save without problems', function (done) {
                return todo.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without content', function (done) {
                todo.content = '';

                return todo.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function (done) {
            Todo.remove({});
            User.remove({});
            done();
        });
        after(function (done) {
            Todo.remove().exec();
            User.remove().exec();
            done();
        });
    });
});
