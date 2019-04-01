var div = document.createElement("div");
var form = document.forms["config"];
var stringTitle = form.title.value;;
var stringBotName = form.bot.value;;
var stringUrl = form.url.value;;
var stringClass = form.class.value;;
var stringFloat = form.float.value;;
var isMove = form.isMove.checked;;
var isCollapse = form.isCollapse.checked;;
var isRequestName = form.isRequestName.checked;;
var isShowDate = form.isShowDate.checked;;
var stringNetwork = form.network.value;;
var stringUpdates = form.updates.value;;
var runButton = document.getElementById("startChat");

form.onchange = get;
form.oninput  = get;

div.style.position = "absolute";
div.style.top = "5%";
div.style.left = "60%";
var chat;

runButton.onclick = function(){
    let config = {
        "chatName": stringTitle,
        "isCollapseble": isCollapse,
        "float": stringFloat,
        "botName": stringBotName,
        "databaseUrl": stringUrl,
        "chatClass": stringClass,
        "isShowData": isShowDate,
        "isRequestName": isRequestName,
        "isMove": isMove,
        "networkType": stringNetwork,
        "updatesType": stringUpdates,
        "status": "client"
    };

    if(!chat)
        chat = new ClientChat(config);

    return false;
}


function get(){
stringTitle = form.title.value;;
stringBotName = form.bot.value;;
stringUrl = form.url.value;;
stringClass = form.class.value;;
stringFloat = form.float.value;;
isMove = form.isMove.checked;;
isCollapse = form.isCollapse.checked;;
isRequestName = form.isRequestName.checked;;
isShowDate = form.isShowDate.checked;;
stringNetwork = form.network.value;;
stringUpdates = form.updates.value;;
    
// var output = 	"&lt;script&gt; src=\"connection.js\"\>&lt;\/script&gt; <br />"
//                 +"&lt;script src=\"script.js\"\>&lt;\/script&gt; <br />"
//                 +"&lt;script&gt; <br />"
//                 +"(function(){<br />"
//                 +"new Chat({<br />"
//                 +"\"chatName\": \"" + stringTitle +"\",<br />"
//                 +"\"botName\": \"" + stringBotName +"\",<br />"
//                 +"\"databaseUrl\": \"" + stringUrl +"\",<br />"
//                 +"\"chatClass\": \"" + stringClass +"\",<br />"
//                 +"\"float\": \"" + stringFloat +"\",<br />"
//                 +"\"isMove\": " + isMove +",<br />"
//                 +"\"isCollapseble\": " + isCollapse +",<br />"
//                 +"\"isRequestName\": " + isRequestName +",<br />"
//                 +"\"isShowData\": " + isShowDate +",<br />"
//                 +"\"networkType\": \"" + stringNetwork +"\"<br />"
//                 +"\"updatesType\": \"" + stringUpdates +"\"<br />"
//                 +"})<br />"
//                 +"})()<br />"
//                 +"&lt;\/script\>";
div.innerHTML = output;
}



form.appendChild(div);