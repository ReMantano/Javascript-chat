var Middleware = require("./middleware");

/**
 * Intermediate processing class for users type requests
 */
module.exports = class MiddlewareUsers extends Middleware{

    constructor(db, subscriber){
        super(db)
        this._subscriber = subscriber;
    }

        /**
     * Get clients from database
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async getClients(req, res){
        let data = await this._db.getClients();
        res.send(data);
    }

        /**
     * Get a specific client from database
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async getClient(req, res){
        let data = await this._db.getClient(req.params.id);
        res.send(data);
    }

        /**
     * Sorts clients 
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async sortClients(req, res){
        let data = await this._db.sortAndFilter(req.body.filterBy, req.body.orderBy, req.body.order)

        res.send(data);
    }

        /**
     * Creates a new client 
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async createClient(req, res){
        let data = await this._db.addNewCliemt(req.body.name);
        this._subscriber.unsubscribeFromClients({ [data.id]: { name: req.body.name , status : "awaiting"} });
        res.send(data);
    }

        /**
     * Creates a new operator
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async createOperator(req, res){
        let data = await this._db.addNewOperator(req.body.name);

        res.send(data);
    }


}