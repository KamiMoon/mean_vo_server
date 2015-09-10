'use strict';

var should = require('should');
var app = require('../../app');
var Organization = require('./organization.model');

var validOrganization = new Organization({
    name: 'My Organization',
    email: 'test@test.com',
    short_description: 'My Desc'
});

describe('Organization Model', function() {
    before(function(done) {
        // Clear before testing
        Organization.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Organization.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no organizations', function(done) {
        Organization.find({}, function(err, organizations) {
            organizations.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate organization', function(done) {
        validOrganization.save(function() {
            var userDup = new Organization(validOrganization);
            userDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    it('should fail when saving without an email', function(done) {
        validOrganization.email = '';
        validOrganization.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should fail when saving with an invalid email', function(done) {
        validOrganization.email = 'eric';
        validOrganization.save(function(err) {
            should.exist(err);
            done();
        });
    });

    xit('should save with a valid email', function(done) {
        validOrganization.email = 'eric@gmail.com';
        validOrganization.save(function(err) {
            should.not.exist(err);
            done();
        });
    });

    it('should fail when saving with an invalid phone', function(done) {
        validOrganization.phone = '4029100331sf';
        validOrganization.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should save when saving with an valid phone', function(done) {
        validOrganization.phone = '402-910-0331';
        validOrganization.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should fail when saving without a short description', function(done) {
        validOrganization.short_description = '';
        validOrganization.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it('should have createdAt and updatedAt properties added', function(done) {
        validOrganization.save(function(err) {

            validOrganization.should.have.property('createdAt');
            validOrganization.should.have.property('updatedAt');

            done();
        });
    });

});