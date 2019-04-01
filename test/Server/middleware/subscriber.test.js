var assert = require("assert");
var Subscriber = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/middleware/subscriber");
var sinon = require("sinon");

describe("Subscriber", function () {

    var response;
    var subscriber;
    var request;

    beforeEach(function () {
        subscriber = new Subscriber();
        response = { send: (item) => item, on : (item, fun) => item };
        request = { body: { id: 2 } };
    })


    it("Subscribe on clients ", async function () {
        subscriber.subscribeOnClients(request,response);

        assert.equal(subscriber._subscribeOnClientsArray.length, 1);
    })

    it("Subscribe on commands ", async function () {
        subscriber.subscribeOnCommands(request,response);

        assert.equal(subscriber._subscribeOnCommandsArray.length, 1);
    })


    it("Subscribe on messages ", async function () {
        subscriber.subscribeOnMessages(request,response);

        assert.equal(subscriber._subscribeOnMessagesArray.length, 1);
    })

    it("Unsubscribe from messages ", async function () {
        subscriber.subscribeOnMessages(request,response);

        assert.equal(subscriber._subscribeOnMessagesArray.length, 1);
        subscriber.unsubscribeFromMessages(request.body.id, "message")

        assert.equal(subscriber._subscribeOnMessagesArray.length, 0)
    })

    it("Unsubscribe from commands ", async function () {
        subscriber.subscribeOnCommands(request,response);

        assert.equal(subscriber._subscribeOnCommandsArray.length, 1);
        subscriber.unsubscribeFromCommands(request.body.id, "Command")

        assert.equal(subscriber._subscribeOnCommandsArray.length, 0)
    })

    it("Unsubscribe from clients ", async function () {
        subscriber.subscribeOnClients(request,response);

        assert.equal(subscriber._subscribeOnClientsArray.length, 1);
        subscriber.unsubscribeFromClients(request.body.id, "message")

        assert.equal(subscriber._subscribeOnClientsArray.length, 0)
    })
})