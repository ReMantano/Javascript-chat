var assert = require("assert");
var MiddlewareChat = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/middleware/middlewareChat");
var Subscriber = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/middleware/subscriber");
var Database = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/database");
var sinon = require("sinon");

describe("MiddlewareChat", function () {

    var fakeFirebase = {database: (empty) => empty};
    var database = new Database(fakeFirebase);;
    var response;
    var middleware;
    var spy;
    var answer;
    var subscriber;

    beforeEach(function () {
        subscriber = new Subscriber();
        response = { send: (item) => item };
        spy = sinon.spy(response, "send");
        answer = {id : "someId"};

        middleware = new MiddlewareChat(database, subscriber);
    })

    afterEach(function () {
        assert.ok(spy.withArgs(answer).calledOnce);
    })


    it("Create a new chat ", async function () {
        sinon.stub(database, "createChat").returns(answer);
        let request = { body: { operatorId: 2, clientId: 3 } };
        await middleware.createChat(request, response);
    })

    it("Close a chat", async function () {

        sinon.stub(database, "closeChat").returns(answer);
        let request = { body: { id: 2, clientId: 3 } };

        await middleware.closeChat(request, response);
    })
})