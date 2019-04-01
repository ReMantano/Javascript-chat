/**
 * Intermediate processing class for subscribe type requests
 */
module.exports = class Subscriber {

    constructor() {
        this._subscribeOnCommandsArray = [];
        this._subscribeOnClientsArray = [];
        this._subscribeOnMessagesArray = [];
    }

        /**
     * Subscribe an operator on new users
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    subscribeOnClients(req, res) {
        let context = this;
        this._subscribeOnClientsArray.push(res);
        res.on("close", function () {
            context._subscribeOnClientsArray.splice(context._subscribeOnClientsArray.indexOf(this), 1);
        })
    }

            /**
     * Subscribe users on new commands
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    subscribeOnCommands(req, res) {
        let context = this;
        this._subscribeOnCommandsArray.push({ id: req.body.id, connection: res });
        res.on("close", function () {
            context._subscribeOnCommandsArray.forEach((item, index, arr) => {
                if(item.connection === this)
                    arr.splice(index, 1);
            })
        })

    }

    
            /**
     * Subscribe users on new messages
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    subscribeOnMessages(req, res) {
        let context = this;
        this._subscribeOnMessagesArray.push({ id: req.body.id, connection: res });
        res.on("close", function () {
            context._subscribeOnMessagesArray.forEach((item, index, arr) => {
                if(item.connection === this)
                    arr.splice(index, 1);
            })
        })
    }

    
            /**
     *Send messages to subscribed users
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    unsubscribeFromMessages(id, message) {
        let temp = [...this._subscribeOnMessagesArray];
    
        this._subscribeOnMessagesArray.forEach(function (item, index, subscribeOnMessagesArray) {
            if (item.id === id) {
                item.connection.send({ message: message })
                temp.splice(temp.indexOf(item), 1);
            };
        })
        this._subscribeOnMessagesArray = temp;

    }

        
            /**
     *Send commands to subscribed users
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    unsubscribeFromCommands(id, data) {
        let temp = [...this._subscribeOnCommandsArray];

        this._subscribeOnCommandsArray.forEach(function (item, index, subscribeOnCommandsArray) {
            if (item.id === id) {
                item.connection.send(data)
                temp.splice(temp.indexOf(item), 1);
            };
        })
        this._subscribeOnCommandsArray = temp;
    }

        
    /**
     *Send client to subscribed operators
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */

    unsubscribeFromClients(data) {
        this._subscribeOnClientsArray.forEach(function (item) {
            item.send(data)
        })

        this._subscribeOnClientsArray = [];
    }


}