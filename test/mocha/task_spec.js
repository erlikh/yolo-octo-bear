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

            it('should be able to show an error when try to save incorrect date', function (done) {
                task.due_date = 'sometime';

                return task.save(function (err, task) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to save with correct given due date', function (done) {
                task.due_date = new Date();

                return task.save(function (err, task) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to save without due date', function (done) {
                task.due_date = undefined;

                return task.save(function (err, task) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be incomplete by default', function (done) {
                return task.save(function (err, task) {
                    task.completed.should.be.false;
                    done();
                });
            });

            it('should show error message if priority > 2', function(done){
                task.priority = 3;

                return task.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show error message if priority < 0', function(done){
                task.priority = -1;

                return task.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show error message if no priority given', function(done){
                task.priority = undefined;

                return task.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should not accept non-whole numbers', function(done){
                task.priority = 1.5;

                return task.save(function (err) {
                    should.exist(err);
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
