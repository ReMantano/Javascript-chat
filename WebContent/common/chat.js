
/**
 * Class containing minimal chat functionality
 */
class Chat {

    /**
     * 
     * @param {object} config Configuration object
     * @param {DOM} inputField 
     * @param {DOM} outputField 
     */
    constructor(config, inputField, outputField) {
        this._polling = new Polling(config.networkType, config.updatesType);
        this._inputField = inputField;
        this._outputField = outputField;
        this.isClose = true;
        this.config = config;
    }

    /**
     * Loading settings from local storage 
     */
    loadSettingsFromLocalStorage() {
        let keys = Object.keys(localStorage);
        let length = keys.length;

        for (let i = 0; i < length; i++) {
            if (keys[i] === "operatorId") {
                this.operatorId = localStorage.getItem("operatorId");
                this.operatorName = localStorage.getItem("operatorName");
            }
            if (keys[i] === "clientId") {
                this.clientId = localStorage.getItem("clientId");
                this.config.isRequestName = false;
                this.clientName = localStorage.getItem("clientName");
            }
        }

    }

    /**
     * Send message
     */
    sendMessage() {
        if (this._inputField.value.length > 0 && !this.isClose) {
            this._polling.sendMessage({
                message: this._inputField.value, date: this._getCurrentTime(),
                clientName: this.clientName, operatorName: this.operatorName,
                sender: this.config.status
            }, this.clientId);

            this._inputField.value = "";
        }
        return false;
    }

    /**
     * 
     * @param {array} text - Array of messages  
     * @param {boolean} clear - Clear output filed
     */
    createMessageBlock(text, clear) {
        if (clear)
            this._outputField.innerHTML = "";

        if(this.isClose)
            return;

        for (let index in text) {
            let p = document.createElement("p");
            p.className = this.config.status === "operator" ? "" : text[index].sender === "client" ? "messageBlock rightMessage" : "messageBlock leftMessage"; 
            let str = this.config.isShowData ? text[index].date + " " + text[index].message : text[index].message;

            p.innerHTML = str;
            this._outputField.appendChild(p);
            this._outputField.scrollTop = this._outputField.scrollHeight;
            localStorage.setItem("clientName", text[index].clientName);
            localStorage.setItem("operatorName", text[index].operatorName);
        }

    }

    /**
     * @private
     * Get curent time as string
     */
    _getCurrentTime() {
        return new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    }
}