/**
 * Chat for a operator
 */
class OperatorChat extends Chat {
    /**
     * 
     * @param {object} config 
     */
    constructor(config) {
        super(config, document.getElementById("textField"), document.getElementById("messagesBlock"))

        this._findElements();
        this._setSettings();
    }

    /**
     * @private
     * 
     * Loading data form local storage
     */
    _setSettings() {
        this.loadSettingsFromLocalStorage();

        if (this.operatorId) {
            this._polling.getUsers(this.createUserBlock.bind(this));
            this._polling.subscribeOnUsers(this.createUserBlock.bind(this));

            if (this.clientId) {
                this.isClose = false;
                this.userHeader.innerHTML = "Active: " + this.clientName;
                this._polling.getMessages(this.clientId, this.createMessageBlock.bind(this));
                this._polling.getCommands(this.clientId, this.createCommandBlock.bind(this));
                this._polling.subscribeOnCommands(this.clientId, this.updateCommandBlock.bind(this));
                this._polling.subscribeOnMessages(this.clientId, this.createMessageBlock.bind(this), true);
            }
        } else {
            this.opeatorName = prompt("Input your name", "your name");
            localStorage.setItem("operatorName", this.opeatorName);
            this._polling.createOperator(this.opeatorName, this._regOpeartor.bind(this));
        }


        this.sortAndFilterUsers.oninput = this._sortAndFilterUsers.bind(this);
        this.externalBlock.onclick = this._clickController.bind(this);
    }

    /**
     * 
     * @param {array} users - Array of users  
     * @param {boolean} clear - Clear output filed
     */
    createUserBlock(users, clear) {
        if (clear)
            this.usersBlock.innerHTML = "";

        for (let index in users) {
            let status = users[index].status;
            let text = users[index].name;
            let leftDiv = document.createElement("span");
            let rightDiv = document.createElement("span");
            let div = document.createElement("div");

            leftDiv.innerText = text;
            rightDiv.style.position = "absolute";
            rightDiv.style.right = "0";
            rightDiv.innerText = status;

            leftDiv.id = index;
            leftDiv.className = "user";
            div.appendChild(leftDiv);
            div.appendChild(rightDiv);

            this.usersBlock.appendChild(div);
        }
    }

        /**
     * 
     * @param {array} commands - Array of commands  
     * @param {boolean} clear - Clear output filed
     */
    createCommandBlock(commands, clear) {
        if (clear)
            this.logBlock.innerHTML = "";

        if (this.isClose)
            return;

        for (let index in commands) {
            let answer = commands[index].answer ? commands[index].answer : "";
            let str = commands[index].date + ": " + commands[index].type + " Command(" + commands[index].data + ") - reult: " + answer;
            let p = document.createElement("p");
            p.id = commands[index].commandId ? commands[index].commandId : index;
            p.innerHTML = str;

            this.logBlock.appendChild(p);
        }
    }

     /**
     * 
     * @param {array} command - Array of commands  
     */
    updateCommandBlock(command) {
        for (let index in command) {
            let update = document.getElementById(command[index].commandId);
            if (update && command[index].answer) {
                update.innerHTML += command[index].answer;
            }
        }
    }


    /**
     * @private
     * 
     * @param {object} data Contains: operatorId and clientID
     */
    createChat(data) {
        this.isClose = false;
        this.clientId = data.clientId;
        localStorage.setItem("clientId", this.clientId);

        this._polling.getMessages(this.clientId, this.createMessageBlock.bind(this));
        this._polling.subscribeOnMessages(this.clientId, this.createMessageBlock.bind(this));
        this._polling.getCommands(this.clientId, this.createCommandBlock.bind(this));
        this._polling.subscribeOnCommands(this.clientId, this.updateCommandBlock.bind(this));
    }

    /**
     * @private
     * 
     * Search for items on the page
     */
    _findElements() {
        this.usersBlock = document.getElementById("usersList");
        this.messagesBlock = document.getElementById("messagesBlock");
        this.logBlock = document.getElementById("logList");
        this.textField = document.getElementById("textField");
        this.externalBlock = document.getElementById("externalBlock");
        this.userHeader = document.getElementById("userHeader");
        this.sortAndFilterUsers = document.forms["sortAndFilterUsers"];
        this.commandType = document.forms["commandForm"].commandType;
        this.commandParam = document.forms["commandForm"].commandParam;
    }

    /**
     * 
     * @param {event} event - Click event
     * 
     */
    _clickController(event) {
        console.log(event.target.className)
        switch (event.target.className) {
            case "user": {
                console.log(this.isClose);
                if (this.isClose) {
                    this.clientName = event.target.innerText;
                    localStorage.setItem("clientName", this.clientName);
                    this.userHeader.innerHTML = "Active: " + this.clientName;
                    this._polling.createChat(this.operatorId, event.target.id, this.createChat.bind(this));
                }
                break;
            }

            case "closeActiveUserButton": {
                if (!this.isClose) {
                    this.userHeader.innerHTML = "Active: ";
                    this._polling.clearTimeOut();
                    localStorage.removeItem("clientName");
                    this._polling.closeChat(this.clientId, this._closeChat.bind(this));
                }
                break;
            }

            case "sendButton": {
                if (!this.isClose) {
                    this.sendMessage();
                }
                return false;
            }

            case "runCommand": {
                if (this.commandParam.value && !this.isClose) {
                    this._polling.addCommand(this.clientId, {
                        date: this._getCurrentTime(),
                        type: this.commandType.value,
                        data: this.commandParam.value
                    }, this.createCommandBlock.bind(this));
                    this.commandParam.value = "";
                }
                return false;
            }
        }

    }

    /**
     * @private
     */
    _sortAndFilterUsers() {
        this.usersBlock.innerHTML = "";
        this._polling.orderAndFilterUsers(this.sortAndFilterUsers.sortBy.value, this.sortAndFilterUsers.filterBy.value, this.createUserBlock.bind(this));
    }


    /**
     * @private
     */
    _closeChat() {
        this.isClose = true;
        this.messagesBlock.innerHTML = ""
        this.logBlock.innerHTML = ""
        localStorage.removeItem("clientId")

        this._polling.getUsers(this.createUserBlock.bind(this), true);
        this._polling.subscribeOnUsers(this.createUserBlock.bind(this));
    }
	/**
     * @private
	 * Create an operaotr
	 * 
	 * @param {object} data
     */
    _regOpeartor(data) {
        this.operatorId = data.id;
        localStorage.setItem("operatorId", data.id);

        this._polling.getUsers(this.createUserBlock.bind(this));
        this._polling.subscribeOnUsers(this.createUserBlock.bind(this));
    }

}