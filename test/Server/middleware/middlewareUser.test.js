var assert = require("assert");
var MiddlewareUser = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/middleware/middlewareUsers");
var Subscriber = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/middleware/subscriber");
var Database = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/database");
var sinon = require("sinon");

describe("MiddlewareUser", function () {

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
        answer = {id : "someId"};

        middleware = new MiddlewareUser(database, subscriber);
    })

    afterEach(function () {
        assert.ok(spy.withArgs(answer).calledOnce);
    })


    it("Get clients from database ", async function () {
        sinon.stub(database, "getClients").returns(answer);
        let request = { params: { id: 2 } };
        await middleware.getClients(request, response);
    })

    it("Get a client from database", async function () {

        sinon.stub(database, "getClient").returns(answer);
        let request = { params: { id: 2 } };

        await middleware.getClient(request, response);
    })


    it("Sort clients", async function () {
        sinon.stub(database, "sortAndFilter").returns(answer);
        let spy = sinon.spy(subscriber, "unsubscribeFromMessages");
        let request = { body: { filterBy: "someValue", orderBy: "name", order: "ask" } };
        await middleware.sortClients(request, response);

    })

    it("Create a new client", async function () {
        sinon.stub(database, "addNewCliemt").returns(answer);
        let spy = sinon.spy(subscriber, "unsubscribeFromClients");
        let request = { body: { id: 2, name: "someMessage" } };
        await middleware.createClient(request, response);

        assert.ok(spy.withArgs({[answer.id] : {name: request.body.name, status : "awaiting"}}).calledOnce);
    })

    it("Create a new operator", async function () {
        sinon.stub(database, "addNewOperator").returns(answer);
        let request = { body: { id: 2, name: "someId", data: "someData" } };
        await middleware.createOperator(request, response);
    })
})