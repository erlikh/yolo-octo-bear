'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Task = mongoose.model('Task');

//Globals
var user;
var task;

//The tests
describe('<Unit Test>', function () {
    describe('Model Task:', function () {
        beforeEach(function (done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function () {
                task = new Task({
                    content: 'Task Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function () {
            it('should be able to save without problems', function (done) {
                return task.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without content', function (done) {
                task.content = '';

                return task.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be incomplete by default', function (done) {
                return task.save(function (err, task) {
                    task.completed.should.be.false;
                    done();
                });
            });


        });

        afterEach(function (done) {
            Task.remove({});
            User.remove({});
            done();
        });
        after(function (done) {
            Task.remove().exec();
            User.remove().exec();
            done();
        });
    });
});
