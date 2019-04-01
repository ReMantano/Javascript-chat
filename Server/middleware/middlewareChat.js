var Middleware = require("./middleware");

/**
 * Intermediate processing class for page type requests
 */
module.exports = class MiddlewareChat extends Middleware{
    /**
     * 
     * @param {Database} db  
     */
    constructor(db){
        super(db)
    }

    /**
     * Creates a new chat 
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async createChat(req, res){
        let data = await this._db.createChat(req.body.operatorId, req.body.clientId);

        res.send(data);
    }

    /**
     * Close a new chat 
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async closeChat(req, res){
        let data = await this._db.closeChat(req.body.id);

        res.send(data);
    }
}