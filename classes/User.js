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
        this.chatInfo = {};
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
    determineChatDetail(){
        let chatDetail = {
            id: '',
            me: '',
            other: '',
        }

        chatDetail.id = this.chatInfo._id;

        if(this.chatInfo.to == this.info.id) {
            chatDetail.me = this.chatInfo.to;
            chatDetail.other = this.chatInfo.from;
        }else {
            chatDetail.me = this.chatInfo.from;
            chatDetail.other = this.chatInfo.to;
        }
        
        return chatDetail;
    }
    
    resetChatInfo() {
        this.chatInfo = {};
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

    async wantsToChat() {
        //
        let data = {
            id: this.info.id,
            wantsToChat: true
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
    
    async engageSelf() {
        let data = {
            id: this.info.id,
            isInChat: true
        }

        return await this.userModel.updateInChatStatus(data);
    }
    async disengageSelf() {
        let data = {
            id: this.info.id,
            isInChat: false
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

    async startChat(callback) {
        let selfIsEngaged = await this.wantsToChat();
        await setTimeout( async () => {
            if(selfIsEngaged.n == 1 || selfIsEngaged.nModified === 1) {
                let selfIsInChat = await this.fetchMyInChatStatus();

                if(selfIsInChat.isInChat) {
                    this.chatInfo = await this.fetchChatInfo();
                    
                    callback(this.chatInfo);
                }else {
                    let freeUser = await this.fetchFreeUser();
                    if(freeUser) {
                        let userEngaged = await this.engageOtherUser(freeUser._id);
                        if(userEngaged.nModified == 1) {
                            this.chatInfo = await this.establishChat(freeUser._id);

                            if (this.chatInfo._id) {
                                await this.engageSelf();
                                callback(this.chatInfo);
                            }else {
                                await this.disengageOtherUser(freeUser._id);
                                await this.disengageSelf();
                                callback(null);
                            }
                        } else{
                            callback(null);
                        }
                    } else {
                        callback(null);
                    }
                }
            } else {
                callback(null);
            }
        }, 2000);
    }
    
 }

 module.exports = User;