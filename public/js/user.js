/*
 *
*/

class User {
    //
    setScreenName(name) {
        let returnValue = false;

        if (name.length > 0) {
            localStorage.setItem('screenName', name);
            returnValue = true;
        }
    }
    getScreenName() {
        let name = localStorage.getItem('screenName');
        return (name) ? name : '';
    }

    setSocketId(socketId) {
        if(socketId) {
            localStorage.setItem('socketId', socketId);
        }
    }
    getSocketId() {
        let id = localStorage.getItem('socketId');
        return id ? id : '';
    }

    setOtherId(id) {
        if
    }
}