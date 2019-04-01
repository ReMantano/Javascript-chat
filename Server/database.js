
require("firebase/database");

/**
 * Class to interact with the firebase database
 */
module.exports = class Database {

    /**
     * 
     * @param {Firebase} firebase - Initialized firebase object 
     */
    constructor(firebase) {
        this._db = firebase.database();
    }


    /**
     * Create a new client and save in database
     * 
     * @param {string} name - Client name
     */
    addNewCliemt(name) {
        return this._addNewUser("Clients", name);
    }

    /**
 * Create a new operator and save in database
 * 
 * @param {string} name - Operator name
 */
    addNewOperator(name) {
        return this._addNewUser("Operators", name);
    }

    /**
     * Filtering and sorting clients by specified parameters
     * 
     * @param {string} filterBy - Filter clients by name 
     * @param {string} orderBy - Grouping clients by name
     * @param {string} order - Ordering
     * 
     * @returns {array} - Returns sorted clients array;
     */
    async sortAndFilter(filterBy, orderBy, order) {
        var temp = [];
        await this._db.ref("Clients").orderByChild("name").startAt(filterBy).endAt(filterBy + "\uf8ff").once("value", function (item) {
            item.forEach(function (child) {
                temp.push(child.val());
            })
        });

        temp.sort(this._sortBy(orderBy, order));

        return temp;
    }


    /**
 * Create a new chat
 * 
 * @param {number} operatorId  
 * @param {number} clientId 
 * 
 * @returns {object} - Returns an object containing the client and operator ID
 */
    createChat(operatorId, clientId) {
        this._db.ref("Operators").child(operatorId).update({ companion: clientId, status: "open" });
        this._db.ref("Clients").child(clientId).update({ companion: operatorId, status: "open" });

        return { operatorId: operatorId, clientId: clientId };
    }

    /**
* Close the chat
* 
* @param {number} id - Client id  
* 
* @returns {object} - Returns an object containing the client ID
*/
    closeChat(id) {
        var context = this;
        this._db.ref("Clients").child(id).child("companion").once("value", function (item) {
            context._db.ref("Operators").child(item.val()).child("companion").remove()
            context._db.ref("Clients").child(id).child("companion").remove();;
            context._db.ref("Clients").child(id).update({ status: "close" });
            context._db.ref("Clients").child(id).update({ status: "close" });
        });


        return { clientId: id };
    }

    /**
* Post a message
* 
* @param {number} id - Client id  
* @param {object} message - Object containing: message, sender, name of operator and client and time of creation
* 
* @returns {object} - Returns posted messages
*/
    async sendMessage(id, message) {
        return await this._db.ref("Messages").child(id).push().set(message);
    }

    /**
* Post a command
* 
* @param {number} id - Client id  
* @param {object} command - Object containing: type, and time of creation
* 
* @returns {object} - Returns posted command
*/
    async addCommand(id, command) {
        let newPostKey = await this._db.ref("Commands").child(id).push().key;
        command.commandId = newPostKey;
        this._db.ref("Commands").child(id).child(newPostKey).set(command);

        return { command: command };
    }

    /**
* Get commands
* 
* @param {number} id - Client id  
* 
* @returns {array} - Returns array contains commands
*/ 
    async getCommandList(id) {
        return await this._db.ref("Commands").child(id).once("value");
    }

    /**
     * 
     * @param {number} id - Client id
     * @param {number} commandId - Command id 
     * @param {string} data - Answer on command
     * 
     * @returns {object} - Object contains an answer and command id 
     */
    async responseOnCommand(id, commandId, data) {
        let answerData = {};
        answerData["answer"] = data;
        this._db.ref("Commands").child(id).child(commandId).update(answerData);

        answerData.commandId = commandId;

        return { answerData: answerData };
    }

    /**
* Get messages
* 
* @param {number} id - Client id  
* 
* @returns {array} - Returns array contains messages
*/ 
    async getMessages(id) {
        return await this._db.ref("Messages").child(id).once("value");
    }

    /**
* Get clients
* 
* 
* @returns {array} - Returns array contains clients
*/ 
    async getClients() {
        return await this._db.ref("Clients").once("value");
    }

        /**
* Get a specific client
* 
* @param {number} id - Client id  
* 
* @returns {object} - Returns client
*/ 
    async getClient(id) {
        return await this._db.ref("Clients").child(id).once("value");
    }

/**
 * @private 
* Create a new user
* 
* @param {number} namse - User name
* @param {string} type - User type
# 
* 
* @returns {number} - Returns id of user
*/ 
    async _addNewUser(type, name) {
        var newPostKey = await this._db.ref().child(type).push().key;
        var insertData = {};
        insertData[type + "/" + newPostKey + "/name"] = name || "unknown";
        insertData[type + "/" + newPostKey + "/id"] = newPostKey;
        insertData[type + "/" + newPostKey + "/status"] = "awaiting";

        this._db.ref().update(insertData);

        return { "id": newPostKey };
    }

    /**
     * @private
     * 
     * @param {string} key - Param for sort
     * @param {string} order - Order of sort
     */
    _sortBy(key, order = "asc") {
        return function (a, b) {
            let result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
            return order === "asc" ? result : -1 * result;
        }
    }
}