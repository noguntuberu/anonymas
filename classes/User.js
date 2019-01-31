/**
 * User class
 */

 class User {
    constructor (socket, userModel) {
        this.socket = socket;
        this.userModel = userModel;
        this.chatModel = null;
        this.info = {};
        this.data = {};
        this.chat = {};
    }

    setChatModel(model) {
        this.chatModel = model;
    }

    setName(name) {
        this.info.name = name;
    }

    setUSerInfo(info) {
        this.info = info;
    }
    async saveName() {
        let return_code = 0;
        let return_body = {id: '', name: ''};
        let newUser = new this.userModel({
            name: this.info.name,
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

    async engageSelf() {
        //
        let data = {
            id: this.info.id,
            wantsToChat: true
        }

        return await this.userModel.updateWantChatStatus(data);
    }

    async disengageSelf() {
        //
        let data = {
            id: this.info.id,
            wantsToChat: false
        }

        return await this.userModel.updateWantChatStatus(data);
    }

    async fetchMyInChatStatus() {
        //
        return await this.userModel.getInChatStatus(this.info.id);
    }

    async fetchChatInfo() {
        //
        return await this.chatModel.getChat(this.info.id);
    }
    
    async fetchFreeUser() {
        //
        return await this.userModel.getFreeUser(this.info.id);
    }

    async engageOtherUser(userId) {
        let data = {
            id: userId,
            isInChat: true
        }

        return await this.userModel.updateInChatStatus(data);
    }

    async disengageOtherUser(userId) {
        let data = {
            id: userId,
            isInChat: true
        }

        return await this.userModel.updateInChatStatus(data);
    }

    async establishChat(userId) {
        let data = new this.chatModel({
            to: userId,
            from: this.info.id,
            isActive: true
        });

        return await this.chatModel.addChat(data);
    }

    async startChat() {
        let selfIsEngaged = await this.engageSelf();
        setTimeout( async () => {
            //  2 seconds delay
            if(selfIsEngaged.nModifed) {
                console.log('enaged myself');
            }
        }, 2000);
    }
    
 }

 module.exports = User;