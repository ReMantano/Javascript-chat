/**
 * Class to create a connection by fetch technology
 */
class RequestBuilderFetch{

    /**
     * 
     * @param {string} method - Type of request method
     * @param {string} url 
     * @param {object} sendData 
     */
    build(method,url, sendData ){
        return fetch(url, {
                        body: JSON.stringify(sendData),
                        method : method,
                        headers: {
                            'Content-Type': 'application/json'
                        }})
                    .then(res => res.json())
                    .then(json => JSON.stringify(json))
    }
}