const SERVER_URL = "http://127.0.0.1:8080";

window.onload = function () {
    var table = document.getElementById("menuTable");
    var temporaryPage = document.createElement("div");
    var style = document.createElement("style");
    var chat = {};

    document.body.appendChild(style);
    document.body.appendChild(temporaryPage);
    temporaryPage.style = "position: absolute; left 10%; width: 90%; top: 8%;"

    table.addEventListener("click", onclick);

    onclick = function (event) {
        if (event.target.tagName !== "TD") return;
        let option = getGradientOption(event.target.id);
        getPage(event.target.id)
        table.style.background = "linear-gradient(90deg, rgb(21, 27, 27) "
            + option.startWhite + "%, rgb(22, 87, 172) "
            + option.startColor + "%, rgb(22, 87, 172) "
            + option.endColor + "%, rgb(21, 27, 27) "
            + option.endWhite + "%)"

    }

    function getGradientOption(num) {
        num = num === "chat" ? 1 : num === "operator" ? 2 : 3;
        return {
            startWhite: 35 * (num - 1),
            startColor: 35 * (num - 1),
            endColor: 35 * num > 100 ? 100 : 35 * num,
            endWhite: 35 * num > 100 ? 100 : 35 * num,
        }
    }

    function getPage(id) {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", SERVER_URL + "/page/"  + id);

        xhr.onload = function () {
            if (this.status === 200) {
                let data = JSON.parse(this.response);
                
                temporaryPage.innerHTML = data.html;
                style.innerHTML = data.css;
                console.log(data);

                let config = {
                    "chatName": "Test",
                    "isCollapseble": true,
                    "float": "right",
                    "botName": "Bob",
                    "databaseUrl": "http://127.0.0.1:8080",
                    "chatClass": "random",
                    "isShowData": true,
                    "isRequestName": true,
                    "isMove": true,
                    "networkType": "fetch",
                    "updatesType": "Long",
                };
                if(chat._polling) chat._polling.clearTimeOut();
                if(id === "operator"){
                    config.status = "operator";
                    setTimeout(() => chat = new OperatorChat(config), 1000);
                    
                }
                else if(id === "chat"){
                    let script = document.createElement("script");
                    script.setAttribute("src", "http://127.0.0.1:8080/WebContent/chat/script/config");
                    temporaryPage.appendChild(script);
                }

            }else{
                console.log(this.status + " : " + this.statusText);
            }
        }

        xhr.send();

    }

}
