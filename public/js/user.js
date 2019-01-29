/*
 *
*/

export class User {
    constructor(HttpObj) {
        this.baseUri = window.location.origin;
        this.http = HttpObj;
    }
    saveNameToDatabase(name) {
        if (name)
        {
            let body = "name="+name;
            this.http.post(
                this.baseUri + '/user', 
                body, 
                {
                    "Content-Type" : "application/x-www-form-urlencoded"
                }
            ).then((response)=>{
                console.log(response);
            });
        }
    }
    saveScreenNameTo(name) {
        let returnValue = false;

        if (name.length > 0) {
            localStorage.setItem('screenName', name);
            returnValue = true;
        }
    }
    getScreenName() {
        let name = localStorage.getItem('screenName');
        return (name) ? name : null;
    }

    setSocketId(socketId) {
        if(socketId) {
            localStorage.setItem('socketId', socketId);
        }
    }
    getSocketId() {
        let id = localStorage.getItem('socketId');
        return id ? id : null;
    }

    setOtherId(id) {
        if (!id) {
            
        }
    }
}