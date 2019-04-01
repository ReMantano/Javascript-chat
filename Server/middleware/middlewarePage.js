var FileReader = require("../fileRider");
var path = require("path");
var Middleware = require("./middleware");
/**
 * Intermediate processing class for text type requests
 */
module.exports = class MiddlewarePage extends Middleware {

    /**
     * 
     * @param {Database} db  
     */
    constructor(db) {
        super(db);
        this._globalDir = __dirname.substr(0, __dirname.indexOf("Server"));
        this._fileReader = new FileReader(this._globalDir);
    }

    /**
     *Get a page 
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     */
    getPage(req, res) {
        let url = "\\WebContent\\" +req.params.type ;
        let promise = this._fileReader.readDir.call(this._fileReader, url);
        promise.then(data => res.send(data))
            .catch(error => {
                res.status(404);
                res.send(error);
            })
    }

    /**
     * Send application home page
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     * 
     */
    getMainPageHtml(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/page/html/index.html"));
    }

    /**
     * Send application chat page
     * 
      * @param {Request} req - request object
     * @param {Response} res - response object
     * 
     */
    getChatPage(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/page/html/chat.html"));
    }

    /**
     * Send application chat page
     * 
      * @param {Request} req - request object
     * @param {Response} res - response object
     * 
     */
    getAboutPage(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/page/html/about.html"));
    }

    /**
     * Send application operator page
     * 
     * @param {Request} req - request object
     * @param {Response} res - response object
     * 
     */
    getOperatorPage(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/page/html/operator.html"));
    }

    /**
    * Send style for main page
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getMainPageStyle(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/page/css/menu.css"));
    }

    /**
    * Send script for main page
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getMainPageScript(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/page/script/main.js"));
    }

    /**
    * Send script for communication between chat and server
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getScriptConnection(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/common/connection/connection.js"));
    }

    /**
    * Send component for requesr to server with XHMHttpRequest
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getScriptRequesrXHR(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/common/connection/requestBuilderXHR.js"));
    }

    /**
   * Send component for requesr to server to use Fetch
   * 
     * @param {Request} req - request object
     * @param {Response} res - response object
   * 
   */
    getScriptRequesrFetch(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/common/connection/requestBuilderFetch.js"));
    }

    /**
    * Send component for communication
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getSCriptPolling(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/common/polling/polling.js"));
    }


        /**
    * Send short polling component
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getScriptLongPolling(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/common/polling/shortPolling.js"));
    }


        /**
    * Send long polling component
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getScriptShortPolling(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/common/polling/longPolling.js"));
    }


        /**
    * Send a simple chat
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getScriptChat(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/common/chat.js"));
    }


        /**
    * Send a html page from chat
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getChatHtml(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/chat/html/index.html"));
    }


        /**
    * Send a style for a client chat 
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getChatStyle(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/chat/css/style.css"));
    }


        /**
    * Send script for congiguration a client chat
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getChatConfig(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/chat/script/chat_config.js"));
    }


        /**
    * Send component for building a chat window
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getChatBuilder(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/chat/script/chatWindowBuilder.js"));
    }


        /**
    * Send chat form a client 
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getClientChat(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/chat/script/clientChat.js"));
    }

    /**
    * Send style for a operator page
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getOperatorStyle(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/operator/css/style.css"));
    }

        /**
    * Send a chat for an opeator;
    * 
     * @param {Request} req - request object
     * @param {Response} res - response object
    * 
    */
    getOperatorChat(req, res) {
        res.sendFile(path.join(this._globalDir, "/WebContent/operator/script/operatorChat.js"));
    }

}