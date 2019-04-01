var assert = require("assert");
var sinon = require("sinon");
var Database = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/database");
var firebase = require("firebase");

describe("Database", async function () {
    var app, spy;

    before(function(){
        firebase.initializeApp({apiKey: "AIzaSyAzD2C5_Xk1jih7kv3P4KCEnaD3iOcsKlM",
        authDomain: "test-8b1d8.firebaseapp.com",
        databaseURL: "https://test-8b1d8.firebaseio.com",
        projectId: "test-8b1d8",
        storageBucket: "test-8b1d8.appspot.com",
        messagingSenderId: "814106028320"
    });
        app = firebase.database();
        spy = sinon.spy(app, "ref");
    })

    it("Get clients from database ", function () {
        let fakeFirebase = {database: (empty) => empty};
        let database = new Database(fakeFirebase);
        
        database._db = app;

        database.getClients();

        assert.ok(spy.called);
        
    })

    it("Get a client from database ", function () {

        let fakeFirebase = {database: (empty) => empty};
        let database = new Database(fakeFirebase);
        
        database._db = app;

        database.getClient("someID");

        assert.ok(spy.called);
        
    })


    it("Get messages ", function () {
        let fakeFirebase = {database: (empty) => empty};
        let database = new Database(fakeFirebase);
        
        database._db = app;

        database.getMessages("someID");

        assert.ok(spy.called);
        
    })

    it("Get commands ", function () {

        let fakeFirebase = {database: (empty) => empty};
        let database = new Database(fakeFirebase);
        database._db = app;

        database.getCommandList("someID");

        assert.ok(spy.called);
        
    })

    it("Sort clients", function(){
        let fakeFirebase = {database: (empty) => empty};
        let database = new Database(fakeFirebase);
        let obj1 = {
            id: 3,
            name: "A",
            status: "awaiting"
        };

        let obj2 = {
            id: 1,
            name: "B",
            status: "open"
        };

        let obj3 = {
            id: 2,
            name: "C",
            status: "close"
        };

        let data = [obj1, obj2, obj3];

        data.sort(database._sortBy("id"));

        assert.equal(data[0], obj2);
        assert.equal(data[1], obj3);
        assert.equal(data[2], obj1);
    })
})