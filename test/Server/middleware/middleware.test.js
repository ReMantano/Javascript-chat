var assert = require("assert");
var Middleware = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/middleware/middleware");

describe("Middleware", function(){

    describe("Set database", function(){
        let testDatabase = "TEST DATABASE"
        let middleware = new Middleware(testDatabase);

        it("Test", function(){
            assert.equal(middleware.getDatabase(), testDatabase);
        })
    })
})