/**
 * @author Oguntuberu Nathan O.
 */

class Chat {
    constructor(chatModel) {
        this.id = null;
        this.firstUser = null;
        this.secondUser = null;
        this.chatModel = chatModel;
    }
    
    //
    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setFirstUser(id) {
        this.firstUser = id;
    }

    getFirstUser() {
        return this.firstUser;
    }

    setSecondUSer(id) {
        this.secondUser = id;
    }

    getSecondUser() {
        return this.secondUser;
    }


    //
    async initiate() {
        let chatData = new this.chatModel({
            to: this.firstUser,
            from: this.secondUser,
            isActive: true
        });

        let chat = await this.chatModel.addChat(chatData);

        if(chat._id) this.setId(chat._id);
    }

    async fetchChat(userId) {
        return await this.chatModel.getChat(userId);
    }

    async leave() {
        return await this.chatModel.endChat(this.id);
    }
}

module.exports = Chat;