///////////////////////////
var HTTP = "http://127.0.0.1:8080";
var REG_OPERATOR = "/users/operator";
var REG_USER = "/users/client";
var GET_USERS_LIST = "/users/clients";
var GET_USERS_MESSAGES = "/messages";
var SEND_MESSAGE = "/messages";
var CREATE_CHAT = "/chat/create";
var CLOSE_CHAT = "/chat/close";
var ORDER_AND_FILTER = "/users/sort";
var SUBSCRIBE_ON_USERS = "/subscribe/clients";
var SUBSCRIBE_ON_MESSAGES = "/subscribe/messages";
var SUBSCRIBE_ON_COMMANDS = "/subscribe/commands";
var COMMAND_ADD = "/commands";
var COMMAND_GET = "/commands";
var COMMAND_RESPONSE = "/command/response";

/**
 * Class for connection between a chat and a database
 */
class Connection{


    /**
     * 
     * @param {string} method - Type of request tehnology: fetch or XHR
     * @param {string} http - Url of database
     */
    constructor(method, http){
        this.http = http ? http : HTTP;
        this._request = method === "fetch" ? new RequestBuilderFetch() : new RequestBuilderXHR() ;
    }

    /**
     * Make a request to database for post a command
     * 
     * @param {number} id - Client id
     * @param {object} command - The object contains: type, data, date
     * 
     * @returns {promise}
     */
    addCommand(id,command){
        return this._request.build("POST",this.http + COMMAND_ADD, {id: id, command: command} );
    }

    /**
     * Make a request to database for get commands
     * 
     * @param {number} id - Client id
     * 
     * @returns {promise}
     */
    getCommandsList(id){
        return this._request.build("GET",this.http + COMMAND_GET + "/" + id);
    }

    /**
     * Make a request to database for post a response to command
     * 
     * @param {number} id - Client id
     * @param {number} commandId - Command id
     * @param {object} data - The object contains: type, data, date
     * 
     * @returns {promise}
     */
    responseOnCommand(id, data, commandId){
        return this._request.build("POST",this.http + COMMAND_RESPONSE, {data:data, id : id, commandId: commandId});
    }

    /**
     * Make a request to database for subscribe on  commands
     * 
     * @param {number} id - Client id
     * 
     * @returns {promise}
     */
    subscribeOnCommands(id){
        return this._request.build("POST",this.http + SUBSCRIBE_ON_COMMANDS + "/" + Date.now() , {"subscribe": "commands", "id": id});
    }

    /**
     * Make a request to database for subscribe on  clients
     * 
     * @returns {promise}
     */
    subscribeOnUsers(){
        return this._request.build("POST",this.http +  SUBSCRIBE_ON_USERS + "/" + Date.now(), {"subscribe": "clients"});;
    }

    /**
     * Make a request to database for subscribe on  messages
     * 
     * @param {number} id - Client id
     * 
     * @returns {promise}
     */
    subscribeOnMessages(id){
        return this._request.build("POST", this.http + SUBSCRIBE_ON_MESSAGES + "/" + Date.now(), {"subscribe": "messages", "id": id});
    }

    /**
     * Make a request to database for get a sort array of users
     * 
     * @param {string} filterBy - Filter clients by name 
     * @param {string} orderBy - Grouping clients by name
     * @param {string} order - Ordering
     * 
     * @returns {promise}
     */
    orderAndFilterUsersBy(orderBy, filterBy, order){
        return this._request.build("POST",this.http + ORDER_AND_FILTER ,{order: order, orderBy: orderBy, filterBy: filterBy});
    }

    /**
     * Make a request to database for close the chat
     * 
     * @param {number} id - Client id
     * 
     * @returns {promise}
     */
    closeChat(id){
        return this._request.build("POST",this.http +  CLOSE_CHAT,{id : id} );
    }

    /**
     * Make a request to database for create a chat
     * 
     * @param {number} operatorId 
     * @param {number} clientId 
     * 
     * @returns {promise}
     */
    createChat(operatorId, clientId){
        return this._request.build("POST",this.http + CREATE_CHAT,  {operatorId: operatorId, clientId: clientId});
    }

    /**
     * Make a request to database for post a message
     * 
     * @param {number} id - Client id
     * @param {object} message - The object contains: sender, message, date
     * 
     * @returns {promise}
     */
    sendMessage(message, id){
        return this._request.build("POST",this.http + SEND_MESSAGE, {id: id, message: message});
    }

    /**
     * Make a request to database for get messages
     * 
     * @param {number} id - Client id
     * 
     * @returns {promise}
     */
    getMessagesList(id){
        return this._request.build("GET",this.http + GET_USERS_MESSAGES + "/" + id );
    }

    /**
     * Make a request to database for get users
     * 
     * @returns {promise}
     */
    getUserList(){
        return this._request.build("GET",this.http +  GET_USERS_LIST);
    }

    /**
     * Make a request to database for create a client
     * 
     * @param {string} name
     * 
     * @returns {promise}
     */
    regUser(name = "unknown"){
        return this._request.build("POST", this.http + REG_USER, {name: name});
    }

    /**
     * Make a request to database to create an operator
     * 
     * @param {string} name
     * 
     * @returns {promise}
     */
    regOperator(name = "unknown"){
        return this._request.build("POST",this.http +  REG_OPERATOR, {name: name});
    }

    /**
     * Make a request to servise for get a client location
     * 
     * @param {string} servise - Url to receive a request
     * 
     * @returns {promise}
     */
    getClientLocation(servise){
        return this._request.build("GET", servise);
    }
}
