var Router = require("./router");
var MiddlewarePage = require("../middleware/middlewarePage");

/**
 * Class for routing requests contains "/page"
 */
module.exports = class RouterPage extends Router{
        /**
     * 
     * @param {Database} db  
     */
    constructor(){
        super();
        this._middleware = new MiddlewarePage();
        this._setSettings();

    }

        /**
     * @private
     * 
     * Router Setup Function
     */
    _setSettings(){
        this._router.get("/", this._middleware.getMainPageHtml.bind(this._middleware));
        this._router.get("/chat", this._middleware.getChatPage.bind(this._middleware));
        this._router.get("/operator", this._middleware.getOperatorPage.bind(this._middleware));
        this._router.get("/about", this._middleware.getOperatorPage.bind(this._middleware));
        this._router.get("/page/:type", this._middleware.getPage.bind(this._middleware));
        this._router.get("/WebContent/page/css/menu", this._middleware.getMainPageStyle.bind(this._middleware));
        this._router.get("/WebContent/page/script/main", this._middleware.getMainPageScript.bind(this._middleware));
        this._router.get("/WebContent/common/connection/connection", this._middleware.getScriptConnection.bind(this._middleware));
        this._router.get("/WebContent/common/connection/xhr", this._middleware.getScriptRequesrXHR.bind(this._middleware));
        this._router.get("/WebContent/common/connection/fetch", this._middleware.getScriptRequesrFetch.bind(this._middleware));
        this._router.get("/WebContent/common/polling/polling", this._middleware.getSCriptPolling.bind(this._middleware));
        this._router.get("/WebContent/common/polling/long", this._middleware.getScriptLongPolling.bind(this._middleware));
        this._router.get("/WebContent/common/polling/short", this._middleware.getScriptShortPolling.bind(this._middleware));
        this._router.get("/WebContent/common/chat", this._middleware.getScriptChat.bind(this._middleware));
        this._router.get("/WebContent/chat/html", this._middleware.getChatHtml.bind(this._middleware));
        this._router.get("/WebContent/chat/css", this._middleware.getChatStyle.bind(this._middleware));
        this._router.get("/WebContent/chat/script/config", this._middleware.getChatConfig.bind(this._middleware));
        this._router.get("/WebContent/chat/script/buider", this._middleware.getChatBuilder.bind(this._middleware));
        this._router.get("/WebContent/chat/script/chat", this._middleware.getClientChat.bind(this._middleware));
        this._router.get("/WebContent/operator/css", this._middleware.getOperatorStyle.bind(this._middleware));
        this._router.get("/WebContent/operator/script/operator", this._middleware.getOperatorChat.bind(this._middleware));
    }
}