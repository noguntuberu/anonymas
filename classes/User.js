/**
 * User class
 */

 class User {
    constructor (userModel) {
        this.userModel = userModel;
        this.name = null;
    }

    setName(name) {
        this.name = name;
    }

    async saveName() {
        let newUser = new this.userModel({
            name: this.name,
            socket: '',
            wantsToChat: false,
            isInChat: false
        });
        await this.userModel.addNewUser(newUser, (err, data) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    }
 }

 module.exports = User;