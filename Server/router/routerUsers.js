var Router = require("./router");
var MiddlewareUsers = require("../middleware/middlewareUsers");

/**
 * Class for routing requests contains "/users"
 */
module.exports = class RouterUsers extends Router{

            /**
     * 
     * @param {Database} db  
     * @param {Subscriber} subscriber 
     */
    constructor(db, subscriber){
        super();
        this._middleware = new MiddlewareUsers(db, subscriber);
        this._setSetting();

    }
    /**
     * @private
     * 
     * Router Setup Function
     */
    _setSetting(){
        this._router.get("/clients", this._middleware.getClients.bind(this._middleware));
        this._router.get("/client/:id", this._middleware.getClient.bind(this._middleware));
        this._router.post("/sort", this._middleware.sortClients.bind(this._middleware));
        this._router.post("/client", this._middleware.createClient.bind(this._middleware));
        this._router.post("/operator", this._middleware.createOperator.bind(this._middleware));
    }
}