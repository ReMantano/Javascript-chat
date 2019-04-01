var express = require("express");
var bodyParser = require('body-parser');

var Database = require("./database");
var RouterChat = require("./router/routerChat");
var RouterPage = require("./router/routerPage");
var RouterText = require("./router/routerText");
var RouterUsers = require("./router/routerUsers");
var Subscriber = require("./middleware/subscriber");

/**
 * Server class
 */
module.exports = class Server {
    /**
     * 
     * @param {number} port number of port when will be deploed server
     */
    constructor(port, firebase) {
        this.port = port || 8080;
        this._app = express();
        this._db = new Database(firebase);
        this._subscriber = new Subscriber();

        this._setSettings();
    }


    /**
     * Start the server
     */
    start() {
        this._app.listen(this.port, () => console.log("Servers is running http://127.0.0.1:" + this.port));
    }

    /**
     * @private
     * 
     * The function of setting the server condition
     */
    _setSettings() {
        var context = this;
        let routerChat = new RouterChat(this._db);
        let routerPage = new RouterPage(this._db);
        let routerText = new RouterText(this._db, this._subscriber);
        let routerUsers = new RouterUsers(this._db, this._subscriber);

        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(bodyParser.json());

        this._app.use("/chat", routerChat.getRouter());
        this._app.use("/users", routerUsers.getRouter());

        this._app.use(routerText.getRouter());
        this._app.use(routerPage.getRouter());

        this._app.use(function (req, res, next) {
            switch (req.body.subscribe) {
                case "clients": {
                    context._subscriber.subscribeOnClients(req, res);
                    break;
                }
                case "commands": {
                    context._subscriber.subscribeOnCommands(req, res);
                    break;
                }

                case "messages": {
                    context._subscriber.subscribeOnMessages(req, res);;
                    break;
                }
                default: {
                    next();
                    break;
                }
            }
        }
        )
    }


}







