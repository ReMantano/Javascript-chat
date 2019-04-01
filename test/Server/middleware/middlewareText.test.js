var assert = require("assert");
var MiddlewareText = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/middleware/middlewareText");
var Subscriber = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/middleware/subscriber");
var Database = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/database");
var sinon = require("sinon");

describe("MiddlewareText", function () {

    var fakeFirebase = {database: (empty) => empty};
    var database = (new Database(fakeFirebase));
    var response;
    var middleware;
    var spy;
    var answer;
    var subscriber;

    beforeEach(function () {
        subscriber = new Subscriber();
        response = { send: (item) => item };
        spy = sinon.spy(response, "send");
        answer = "someAnswer";

        middleware = new MiddlewareText(database, subscriber);
    })

    afterEach(function () {
        assert.ok(spy.withArgs(answer).calledOnce);
    })


    it("Get clients messages from database", async function () {
        sinon.stub(database, "getMessages").returns(answer);
        let request = { params: { id: 2 } };
        await middleware.getMessages(request, response);
    })

    it("Get commands from database", async function () {

        sinon.stub(database, "getCommandList").returns(answer);
        let request = { params: { id: 2 } };

        await middleware.getCommand(request, response);
    })


    it("Post clients messages to database", async function () {
        sinon.stub(database, "sendMessage").returns(answer);
        let spy = sinon.spy(subscriber, "unsubscribeFromMessages");
        let request = { body: { id: 2, message: "someMessage" } };
        await middleware.postMessage(request, response);

        assert.ok(spy.withArgs(request.body.id, request.body.message).calledOnce);
    })

    it("Post a command to database", async function () {
        sinon.stub(database, "addCommand").returns(answer);
        let spy = sinon.spy(subscriber, "unsubscribeFromCommands");
        let request = { body: { id: 2, command: "someMessage" } };
        await middleware.postCommand(request, response);

        assert.ok(spy.withArgs(request.body.id, answer).calledOnce);
    })

    it("Post an answer on a command", async function () {
        sinon.stub(database, "responseOnCommand").returns(answer);
        let spy = sinon.spy(subscriber, "unsubscribeFromCommands");
        let request = { body: { id: 2, commandId: "someId", data: "someData" } };
        await middleware.postCommandResponse(request, response);

        assert.ok(spy.withArgs(request.body.id, answer).calledOnce);
    })
})