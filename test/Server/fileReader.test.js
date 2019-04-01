var assert = require("assert");
var sinon = require("sinon");
var FileReader = require( __dirname.substr(0, __dirname.indexOf("test")) + "Server/fileRider");

describe("FileReader", function () {

    it("Read a file ", async function () {
        let fileReader = new FileReader();
        let spy = sinon.stub(fileReader._fs, "readFileSync");
        let dirs = ["file.js", "file.js"]

        sinon.stub(fileReader._fs, "readdirSync").returns(dirs);

        fileReader._dirReader("someUrl", []);

        assert.equal(dirs.length, spy.callCount);
    })

})