/**
 * Class for interacting with the database on short polling technology
 */
class LongPolling{

    /**
     * 
     * @param {Connecton} connection  
     */
    constructor(connection){
        this._connection = connection;
    }

    /**
     * Subscribe on commands
     * 
     * @param {LongPolling} context 
     * @param {number} id 
     * @param {function} fun 
     */
    subscribeOnCommands(context, id, fun){
        let response = context._connection.subscribeOnCommands(id);

        response.then(body => JSON.parse(body))
                .then(data => fun(data))
                .then(() => setTimeout(context.subscribeOnCommands,0,context, id, fun))
                .catch(error => console.log(error));
    }

    /**
     * Subscribe on messages
     * 
     * @param {LongPolling} context 
     * @param {number} id 
     * @param {function} fun 
     */
    subscribeOnMessages(context, id, fun){
        let response = context._connection.subscribeOnMessages(id);

        response.then((body) => JSON.parse(body))
                .then((messages) => fun(messages))
                .then(() => setTimeout(context.subscribeOnMessages,0, context,id,fun))
                .catch((error) => console.log(error));
    }

    /**
     * Subscribe on users
     * 
     * @param {LongPolling} context 
     * @param {function} fun 
     */
    subscribeOnUser(context,fun) {
        let response = context._connection.subscribeOnUsers();

        response.then((body) => JSON.parse(body))
                .then((users) =>  fun(users))
                .then(() => setTimeout(context.subscribeOnUser,0, context,fun))
                .catch((error) => console.log(error));
    }
}

