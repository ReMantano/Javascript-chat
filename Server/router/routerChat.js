var Router = require("./router");
var MiddlewareChat = require("../middleware/middlewareChat");

/**
 * Class for routing requests contains "/chat"
 */
module.exports = class RouterChat extends Router{

    /**
     * 
     * @param {Database} db  
     */
    constructor(db){
        super();
        this._middleware = new MiddlewareChat(db);
        this._setSettings();
    }

    /**
     * @private
     * 
     * Router Setup Function
     */
    _setSettings(){
        this._router.post("/create", this._middleware.createChat.bind(this._middleware));
        this._router.post("/close", this._middleware.closeChat.bind(this._middleware));
    }
}