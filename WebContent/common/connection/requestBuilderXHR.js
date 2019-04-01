/**
 * Class to create a connection by XHR technology
 */
class RequestBuilderXHR{

        /**
     * 
     * @param {string} method - Type of request method
     * @param {string} url 
     * @param {object} sendData 
     */
    build(method,url, sendData ){
        let promise = new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open(method,  url);
    
            xhr.onload = function(){
                if(this.status >= 200 && this.status <= 299){
                    resolve(this.response);
                }else {
                    reject(new Error(this.status));
                }
            }

            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(JSON.stringify(sendData))
        })
        return promise;
    }
}