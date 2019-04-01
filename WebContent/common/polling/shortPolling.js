
/**
 * Class for interacting with the database on short polling technology
 */
class ShortPolling {

    /**
     * 
     * @param {Connecton} connection  
     */
    constructor(connection) {
        this._connection = connection;
    }

        /**
     * Make a request to database for post a message
     * 
     * @param {stirn} message 
     * @param {number} clientId
     * 
     */
    sendMessage(message, clientId){
        this._connection.sendMessage(message, clientId).catch((error) => console.log(error));
    }

    /**
     * Make a request to database for get messages
     * 
     * @param {number} id - Client id
     * @param {funcction} fun - Callback
     * @param {any} data - Additional parameters for the function
     * 
     */
    getAllCommands(id ,fun, data) {
        this._callBack(this._connection.getCommandsList(id) , fun, data);
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
        this._callBack(this._connection.getMessagesList(id), fun, data);
    }

        /**
     * Make a request to database for get users
     * 
     * @param {function} fun - Callback
     * @param {any} data - Additional parameters for the function
     * 
     */
    getUsers(fun, data) {
        this._callBack(this._connection.getUserList(), fun, data);

    }

        /**
     * Make a request to database for create an operator
     * 
     * @param {stirn} name - Operator name
     * @param {function} fun - Callback
     * 
     */
    createUser(name,fun){
        this._callBack(this._connection.regUser(name), fun);
    }

        /**
     * Make a request to database for create a client
     * 
     * @param {stirn} name - Client name
     * @param {function} fun - Callback
     * 
     */
    createOperator(name, fun){
        this._callBack(this._connection.regOperator(name), fun);
    }

    createChat(operatorId, clientId, fun){
        this._callBack(this._connection.createChat(operatorId, clientId), fun);
    }

    closeChat(clientId, fun){
        this._callBack(this._connection.closeChat(clientId), fun);
    }

    addCommand(clientId, command, fun){
        this._callBack(this._connection.addCommand(clientId, command), fun);
    }

    orderAndFilterUsers(orderBy, filterBy, fun){
        this._callBack(this._connection.orderAndFilterUsersBy(orderBy,filterBy), fun);
    }

    getClientLocation(service,commandId,id, fun){
        this._callBack(this._connection.getClientLocation(service), fun, {commandId: commandId, id:id});
    }

    sendAnswerOnCommand(answer, config){
        this._connection.responseOnCommand(config.id, answer,config.commandId).catch((error) => console.log(error))
    }


    _callBack(response, fun, someVariable){
        response.then((body) => JSON.parse(body))
                .then((data) => fun(data,someVariable))
                .catch((error) => console.log(error))
    }
}