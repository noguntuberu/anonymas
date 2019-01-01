/*
 *
*/

export class User {
    constructor(HttpObj) {
        this.http = HttpObj;
    }
    saveNameToDatabase(name) {
        if (!name)
        {
            this.http.get('')
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