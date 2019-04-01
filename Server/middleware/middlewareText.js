var Middleware = require("./middleware");

/**
 * Intermediate processing class for chat type requests
 */
module.exports = class MiddlewareText extends Middleware{

    constructor(db, subscriber){
        super(db);
        this._subscriber = subscriber;
    }

    /**
     * Get messages for database
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async getMessages(req, res){
        let data = await this._db.getMessages(req.params.id);
        res.send(data);
    }

    /**
     * Get commands fro database
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async getCommand(req,res){
        let data = await this._db.getCommandList(req.params.id);

        res.send(data);
    }

    /**
     * Post a message to database
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async postMessage(req, res){
        let data = await this._db.sendMessage(req.body.id, req.body.message);

        this._subscriber.unsubscribeFromMessages(req.body.id, req.body.message);

        res.send(data);
    }

        /**
     * Post a command to database
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async postCommand(req, res){
        let data = await this._db.addCommand(req.body.id, req.body.command);

        this._subscriber.unsubscribeFromCommands(req.body.id, data);
    
        res.send(data);
    }

        /**
     * Post a response from a command to database
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    async postCommandResponse(req, res){
        let data = await this._db.responseOnCommand(req.body.id, req.body.commandId, req.body.data);
        this._subscriber.unsubscribeFromCommands(req.body.id, data);
    
        res.send(data);
    }

    


}