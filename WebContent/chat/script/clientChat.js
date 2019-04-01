/**
 * Chat for client
 */
class ClientChat extends Chat {

	/**
	 * 
	 * @param {object} config 
	 */
	constructor(config) {
		let chatWindow = new ChatWindowBuilder(config).build();
		super(config, chatWindow.formTextarea, chatWindow.messagesField);
		this._chatWindow = chatWindow;
		this.isClose = false;

		this._setSettings();
	}

	    /**
     * @private
     * 
     * Loading data form local storage
     */
	_setSettings() {
		this.loadSettingsFromLocalStorage();

		if (!this.clientId) {
			if (this.config.isRequestName) {
				this.createMessageBlock({ message: { date: this._getCurrentTime(), message: "Input your name " } });
				this._chatWindow.chatSendButton.onclick = this._request.bind(this);
			}
			else {
				this._chatWindow.chatSendButton.onclick = this.sendMessage.bind(this);
				this._polling.createUser(this._createUser.bind(this));
			}
		} else {
			this._chatWindow.chatSendButton.onclick = this.sendMessage.bind(this);

			this._polling.getMessages(this.clientId, this._getMessage.bind(this));
			this._polling.subscribeOnMessages(this.clientId, this._getMessage.bind(this));
			this._polling.getCommands(this.clientId, this._answerOnCommand.bind(this));
			this._polling.subscribeOnCommands(this.clientId, this._answerOnCommand.bind(this));
		}

		if (!this.config.isCollapseble) {
			this.config.isCollapsed = true;
		}
	}

    /**
     * @private
	 * 
     * @param {array} text - Array of messages  
     * @param {boolean} clear - Clear output filed
     */
	_getMessage(text, clear) {
		this.createMessageBlock(text, clear);
		this._chatWindow.userIconBlock.lastChild.innerText = "Operator";
	}


	/**
	 * @private
	 * 
	 * Request a client name
	 */
	_request() {
		this.clientName = this._chatWindow.formTextarea.value;
		this._polling.createUser(this.clientName, this._createUser.bind(this));
		this._chatWindow.formTextarea.value = "";

		this.createMessageBlock({ message: { date: this._getCurrentTime(), message: "Hello, " + this.clientName } });
		this._chatWindow.chatSendButton.onclick = this.sendMessage.bind(this);

		return false;
	}

	/**
     * @private
	 * Create a client
	 * 
	 * @param {object} data
     */
	_createUser(data) {
		this.clientId = data.id;
		localStorage.setItem("clientId", data.id);
		this._polling.subscribeOnMessages(this.clientId, this._getMessage.bind(this));
		this._polling.subscribeOnCommands(this.clientId, this._answerOnCommand.bind(this));
	}

	/**
     * @private
	 * 
	 * Response to an operator command
	 * 
	 * @param {object} command
     */
	_answerOnCommand(command) {
		let context = this;
		for (let index in command) {
			if (!command[index].answer) {
				if (command[index].type === "location") {
					this._polling.getClientLocation(command[index].data, index, this.clientId);
				} else {
					let comm = command[index];
					setTimeout(function(){
						let answer = prompt(comm.data, "default");
						context._polling.sendAnswerOnCommand(answer, { commandId: comm.commandId, id: context.clientId });
					}, 500)

				}
			}
		}
	}
}