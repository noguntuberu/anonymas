/**
 * User class
 */

 class User {
    constructor (socket, userModel) {
        this.socket = socket;
        this.userModel = userModel;
        this.name = null;
        this.error = null;
        this.data = {};
    }

    setName(name) {
        this.name = name;
    }

    async saveName() {
        let return_code = 0;
        let return_body = {id: '', name: ''};
        let newUser = new this.userModel({
            name: this.name,
            socket: '',
            wantsToChat: false,
            isInChat: false
        });
        let response = await this.userModel.addNewUser(newUser);
        if(response._id) {
            return_code = 1;
            return_body.id = response._id;
            return_body.name = response.name;
        }
        //
        this.socket.emit('add-screen-name', {code: return_code, body: return_body});
    }
    
 }

 module.exports = User;