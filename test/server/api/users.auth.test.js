/***********************************************
 * Sample of how to test API routes on server. *
 ***********************************************/
import {expect} from "chai";
import rewire from "rewire";
import request from "supertest";
import {app} from "../../../app/server/server.js";
const db = rewire("../../../app/database/db");

describe('Passport', () => {

    const baseUrl = '/api/users';
    const email = 'foo@bar.com';
    const password = 'foobar';
    const first_name = 'Foo';
    const last_name = 'Bar';

    describe('User registration', () => {

        before((done) => {
            // passport and db init
            db.__set__('passportConfig', function(passport, database) {
                return null;
            });
            const database = db();
            // clear users table
            database.repositories.UserRepository.all(database.connection)
                .then((users) => {
                    users.forEach((record) => {
                        database.repositories.UserRepository.delete(record).then(() => {
                            done();
                        })
                    });
                });
        });

        it('should return the registered user if registration succeeded', (done) => {
            // send some registration data
            var post = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            };
            request(app)
                .post(baseUrl + '/register')
                .send(post)
                .expect(200)
                .end((err, res) => {
                    expect(err).to.not.exist;

                    let content = JSON.parse(res.text);
                    // confirm that returned user is the same
                    expect(content.email).to.equal(email);
                    expect(content.first_name).to.equal(first_name);
                    expect(content.last_name).to.equal(last_name);

                    done();
                });
        });

        it('should return a message if user already exists', (done) => {
            // send some registration data
            var post = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            };
            request(app)
                .post(baseUrl + '/register')
                .send(post)
                .expect(403)
                .end((err, res) => {
                    expect(err).to.not.exist;

                    let content = JSON.parse(res.text);
                    // confirm that an error message is returned
                    expect(content.error).to.equal(true);
                    expect(content.message).to.equal('User Already Exists.');
                    done();
                });
        });

    });

    describe('User authentication', () => {
        const url = baseUrl + '/login';

        const loginData = {
            email: email,
            password: password
        };

        it("should return a message if user doesn't exist", (done) => {
            const loginData = {
                email: 'bar@foo.com',
                password: password
            };

            request(app)
                .post(url)
                .send(loginData)
                .expect(403)
                .end((err, res) => {
                    expect(err).to.not.exist;

                    let content = JSON.parse(res.text);
                    // confirm that an error message is returned
                    expect(content.error).to.equal(true);
                    expect(content.message).to.equal('Unknown user.');
                    done();
                });
        });

        it("should return a message if user credentials don't match", (done) => {
            const loginData = {
                email: email,
                password: 'fakepassword'
            };

            request(app)
                .post(url)
                .send(loginData)
                .expect(403)
                .end((err, res) => {
                    expect(err).to.not.exist;

                    let content = JSON.parse(res.text);
                    // confirm that an error message is returned
                    expect(content.error).to.equal(true);
                    expect(content.message).to.equal('Invalid username or password.');
                    done();
                });
        });

        it('should return the logged in user if login succeeded', (done) => {
            const loginData = {
                email: email,
                password: password
            };

            request(app)
                .post(url)
                .send(loginData)
                .expect(200)
                .end((err, res) => {
                    expect(err).to.not.exist;

                    let content = JSON.parse(res.text);
                    // confirm that returned user is the same
                    expect(content.email).to.equal(email);
                    expect(content.first_name).to.equal(first_name);
                    expect(content.last_name).to.equal(last_name);
                    done();
                });
        });

    });

    describe('User logout', () => {

        it('should return a message if successfully logged user out', (done) => {
            request(app)
                .get(baseUrl + '/logout')
                .expect(200)
                .end((err, res) => {
                    expect(err).to.not.exist;

                    let content = JSON.parse(res.text);
                    // confirm that a success message is returned
                    expect(content.error).to.equal(false);
                    expect(content.message).to.equal('User logged out.');
                    done();
                });
        });

    });

});