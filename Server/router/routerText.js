
var Router = require("./router");
var MiddlewareText = require("../middleware/middlewareText");

/**
 * Class for routing requests 
 */
module.exports = class RouterText extends Router{

        /**
     * 
     * @param {Database} db  
     * @param {Subscriber} subscriber 
     */
    constructor(db, subscriber){
        super();
        this._middleware = new MiddlewareText(db, subscriber);
        this._setSettings();
    }
    /**
     * @private
     * 
     * Router Setup Function
     */
    _setSettings(){
        this._router.get("/messages/:id", this._middleware.getMessages.bind(this._middleware));
        this._router.get("/commands/:id", this._middleware.getCommand.bind(this._middleware));
        this._router.post("/messages", this._middleware.postMessage.bind(this._middleware));
        this._router.post("/commands", this._middleware.postCommand.bind(this._middleware));
        this._router.post("/command/response", this._middleware.postCommandResponse.bind(this._middleware));
    }
}