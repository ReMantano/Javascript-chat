var assert = require("assert");
var MiddlewarePage = require("D://Projects/JavaScript/js-touchsoft/Task 01/Server/middleware/middlewarePage");
var Database = require("D://Projects/JavaScript/js-touchsoft/Task 01/Server/database");
var sinon = require("sinon");

describe("MiddlewarePage", function () {

    var middleware;
    var response;
    var spy;
    var data;

    beforeEach(function () {
        let fakeFirebase = {database: (empty) => empty};
        middleware = new MiddlewarePage(new Database(fakeFirebase));
        response = { send: (item) => item };
        spy = sinon.spy(response, "send");
        data = "some Data";
    })

    afterEach(function () {
        assert.ok(spy.withArgs(data).calledOnce);
    })

    it("Get a chat page", async function () {

        sinon.stub(middleware._fileReader, "readDir").resolves(data);

        let request = { params: { type: "chat" } };
        await middleware.getPage(request, response);

    })

    it("Get a opearaotr page", async function () {

        sinon.stub(middleware._fileReader, "readDir").resolves(data);

        let request = { params: { type: "chat" } };
        await middleware.getPage(request, response);

    })
})