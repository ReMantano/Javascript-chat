/**
 * Intermediary class between chat and database
 */

class Polling {

    /**
     * 
     * @param {string} networkType - Network texnology
     * @param {string} updateType Texnology of updating
     */
    constructor(networkType, updateType) {
        this._short = new ShortPolling(new Connection(networkType));
        this._long = updateType === "Long" ? new LongPolling(new Connection(networkType)) : undefined;
        this._timeOutIdArray = [];
    }

    /**
     * Make a request to database for get messages
     * 
     * @param {number} id - Client id
     * @param {funcction} fun - Callback
     * @param {any} data - Additional parameters for the function
     * 
     */
    getMessages(id, fun, data) {
        this._short.getMessages(id, fun, data);
    }

    /**
     * Make a request to database for get commands
     * 
     * @param {number} id - Client id
     * @param {funcction} fun - Callback
     * @param {any} data - Additional parameters for the function
     * 
     */
    getCommands(id, fun, data) {
        this._short.getAllCommands(id, fun, data);
    }

    /**
     * Make a request to database for get users
     * 
     * @param {function} fun - Callback
     * @param {any} data - Additional parameters for the function
     * 
     */
    getUsers(fun, data) {
        this._short.getUsers(fun, data);
    }

    /**
     * Make a request to database for create an operator
     * 
     * @param {stirn} name - Operator name
     * @param {function} fun - Callback
     * 
     */
    createOperator(name, fun) {
        this._short.createOperator(name, fun)
    }

    /**
     * Make a request to database for create a client
     * 
     * @param {stirn} name - Client name
     * @param {function} fun - Callback
     * 
     */
    createUser(name, fun) {
        this._short.createUser(name, fun)
    }

    /**
     * Make a request to database for post a message
     * 
     * @param {stirn} message 
     * @param {number} clientId
     * 
     */
    sendMessage(message, clientId) {
        this._short.sendMessage(message, clientId);
    }

    /**
     * Make a request to database for create a chat
     * 
     * @param {number} operatorId 
     * @param {number} clientId 
     * @param {function} fun - Callback
     * 
     */
    createChat(opearatorId, clientId, fun) {
        this._short.createChat(opearatorId, clientId, fun);
    }

     /**
     * Make a request to database for close the chat
     * 
     * @param {number} clientId 
     * @param {function} fun - Callback
     * 
     */
    closeChat(clientId, fun) {
        this._short.closeChat(clientId, fun);
    }

    /**
     * Make a request to database for post a command
     * 
     * @param {number} operatorId 
     * @param {number} clientId 
     * @param {function} fun - Callback
     * 
     */
    addCommand(clientId, command, fun) {
        this._short.addCommand(clientId, command, fun)
    }

    orderAndFilterUsers(orderBy, filterBy, fun) {
        this._short.orderAndFilterUsers(orderBy, filterBy, fun);
    }

    sendAnswerOnCommand(answer, config) {
        this._short.sendAnswerOnCommand(answer, config);
    }

    getClientLocation(service, commandId, id) {
        this._short.getClientLocation(service, commandId, id, this.sendAnswerOnCommand.bind(this));
    }

    subscribeOnMessages(id, fun) {
        if (this._long)
            this._long.subscribeOnMessages(this._long, id, fun);
        else
            this.shortPoolingMessages(id, fun)
    }

    subscribeOnCommands(id, fun) {
        if (this._long)
            this._long.subscribeOnCommands(this._long, id, fun);
        else
            this.shortPoolingCommands(id, fun);
    }

    subscribeOnUsers(fun) {
        if (this._long)
            this._long.subscribeOnUser(this._long, fun);
        else
            this.shortPoolingUsers(fun);

    }

    shortPoolingUsers(fun, data) {
        this._short.getUsers(fun, data)
        this._timeOutIdArray.push(setTimeout(this.shortPoolingUsers.bind(this, fun, true), 1000));
    }

    shortPoolingMessages(id, fun) {
        this._short.getMessages(id, fun, true);
        this._timeOutIdArray.push(setTimeout(this.shortPoolingMessages.bind(this, id, fun), 1000))
    }

    shortPoolingCommands(id, fun) {
        this._short.getAllCommands(id, fun, true);
        this._timeOutIdArray.push(setTimeout(this.shortPoolingCommands.bind(this, id, fun), 1000))
    }

    clearTimeOut(){
        this._timeOutIdArray.forEach((item) => clearTimeout(item));
    }
}