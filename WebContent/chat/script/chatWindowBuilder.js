var CHAT_FORM_SEND_BUTTON_ID = "chatSendButton";
var CHAT_FORM_TEXTAREA_ID = "chatTextarea";
var CHAT_FORM_ID = "chatForm";
var CHAT_USER_ICON_BLOCK = "userIconBlock";
var CHAT_MESSAGES_FIELD_ID = "chatMessagesField";
var CHAT_INNER_BLOCK_ID = "chatInnerBlock";
var CHAT_HEADER_BLOCK_ID = "chatHeaderBlock";
var CHAT_EXTERNAL_BLOCK_ID = "chatExternalBlock";

/**
 * Class that creates a chat window
 */
class ChatWindowBuilder {

    /**
     * 
     * @param {object} config 
     */
    constructor(config) {
        this.chatWindow = {};
        this._config = config;
    }

    /**
     * Create a chat window
     * 
     * @returns {object}
     */
    build() {
        this._createChatElements();
        this._setIdToElements();
        this._tuneChatElemets();
        this._setChildToParents();

        return this.chatWindow;
    }

    /**
     * @private
     * 
     * Create  chat elements
     */
    _createChatElements(){
        this.chatWindow.externalChatBlock = document.createElement("div");
        this.chatWindow.headerBlock = document.createElement("div");
        this.chatWindow.innerChatBlock = document.createElement("div");
        this.chatWindow.messagesField = document.createElement("div");
        this.chatWindow.chatForm = document.createElement("form");
        this.chatWindow.userIconBlock = document.createElement("div");
        this.chatWindow.formTextarea = document.createElement("textarea");
        this.chatWindow.chatSendButton = document.createElement("button");
    }

       /**
     * @private
     * 
     * Set id to chat elements
     */
    _setIdToElements() {
        this.chatWindow.externalChatBlock.id = CHAT_EXTERNAL_BLOCK_ID;
        this.chatWindow.headerBlock.id = CHAT_HEADER_BLOCK_ID;
        this.chatWindow.innerChatBlock.id = CHAT_INNER_BLOCK_ID;
        this.chatWindow.messagesField.id = CHAT_MESSAGES_FIELD_ID;
        this.chatWindow.chatForm.id = CHAT_FORM_ID;
        this.chatWindow.userIconBlock.id = CHAT_USER_ICON_BLOCK;
        this.chatWindow.formTextarea.id = CHAT_FORM_TEXTAREA_ID;
        this.chatWindow.chatSendButton.id = CHAT_FORM_SEND_BUTTON_ID;
    }

    /**
     * @private
     * 
     * Configure chat items
     */
    _tuneChatElemets() {
        let spanChatName = document.createElement("span");
        spanChatName.style.cssFloat = "right";
        spanChatName.innerText = this._config.chatName;
        let i = document.createElement("i");
        let spanOperatorName = document.createElement("span");
        i.className = "fas fa-user-tie";

        this.chatWindow.userIconBlock.appendChild(i);
        this.chatWindow.userIconBlock.appendChild(spanOperatorName);
        this.chatWindow.chatForm.setAttribute("action", "#");
        this.chatWindow.headerBlock.appendChild(spanChatName); 
        this.chatWindow.chatSendButton.innerHTML = "Send";
        this.chatWindow.innerChatBlock.className = this._config.isCollapseble ? "visible" : "hidden";
        this.chatWindow.externalChatBlock.setAttribute("class", this._config.chatClass);

        if (this._config.float === "right")
            this.chatWindow.externalChatBlock.style.right = "10px";
        else
            this.chatWindow.externalChatBlock.style.left = "10px";

        if (this._config.isMove)
            this._setMoveEventOnChat();

        if (this._config.isCollapseble)
            this._setClickEventOnHeader();

    }


    /**
     * @private
     * 
     * Set the chat window in body
     */
    _setChildToParents() {

        this.chatWindow.chatForm.appendChild(this.chatWindow.formTextarea);
        this.chatWindow.chatForm.appendChild(this.chatWindow.chatSendButton);
        this.chatWindow.innerChatBlock.appendChild(this.chatWindow.messagesField);
        this.chatWindow.innerChatBlock.appendChild(this.chatWindow.chatForm);
        this.chatWindow.headerBlock.appendChild(this.chatWindow.userIconBlock);
        this.chatWindow.externalChatBlock.appendChild(this.chatWindow.headerBlock);
        this.chatWindow.externalChatBlock.appendChild(this.chatWindow.innerChatBlock);

        document.body.lastChild.appendChild(this.chatWindow.externalChatBlock);
    }

    /**
     * @private
     * Set an event listener on chat header
     */
    _setClickEventOnHeader() {
        var context = this;
        this.chatWindow.headerBlock.onclick = function () {
            let collapsed = context.chatWindow.innerChatBlock.className === "visible" ? false : true;
            context.chatWindow.innerChatBlock.className = collapsed ? "visible" : "hidden";
            localStorage.setItem("isCollapsed", collapsed);
        };
    }

        /**
     * @private
     * Set a move event listener on chat 
     */
    _setMoveEventOnChat() {
        var context = this;
        var delta_x = 0;
        var delta_y = 0;

        this.chatWindow.externalChatBlock.onmousedown = saveXY;

        document.onmouseup = clearXY;

        function saveXY(event) {

            var x_block = context.chatWindow.externalChatBlock.offsetLeft;
            var y_block = context.chatWindow.externalChatBlock.offsetTop;

            delta_x = x_block - event.pageX;
            delta_y = y_block - event.pageY;

            document.onmousemove = moveChat;
        }

        function clearXY() {
            document.onmousemove = null;
        }

        function moveChat(event) {
            var new_x = delta_x + event.pageX;
            var new_y = delta_y + event.pageY;

            context.chatWindow.externalChatBlock.style.top = new_y + "px";
            context.chatWindow.externalChatBlock.style.left = new_x + "px";
        }
    }

}