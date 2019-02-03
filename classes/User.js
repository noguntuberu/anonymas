/**
 * User class
 */

 class User {
    constructor (userModel) {
        this.id = null;
        this.name = '';
        this.userModel = userModel;
        this.chatModel = null;
        this.chatInfo = {};
        this.socket = null;
    }

    setChatModel(model) {
        this.chatModel = model;
    }

    setName(name) {
        this.name = name;
    }

    setId(id) {
        this.id = id;
    }

    setSocket(socket) {
        this.socket = socket;
    }

    determineChatDetail(){
        let chatDetail = {
            id: '',
            me: '',
            other: '',
        }

        chatDetail.id = this.chatInfo._id;

        if(this.chatInfo.to == this.id) {
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

    async wantsToChat() {
        //
        let data = {
            id: this.id,
            wantsToChat: true
        }

        return await this.userModel.updateWantChatStatus(data);
    }

    async fetchMyInChatStatus() {
        //
        return await this.userModel.getInChatStatus(this.id);
    }

    async fetchChatInfo() {
        //
        return await this.chatModel.getChat(this.id);
    }
    
    async fetchFreeUser() {
        //
        return await this.userModel.getFreeUser(this.id);
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
            id: this.id,
            isInChat: true
        }

        return await this.userModel.updateInChatStatus(data);
    }
    async disengageSelf() {
        let data = {
            id: this.id,
            isInChat: false
        }

        return await this.userModel.updateInChatStatus(data);
    }
    async disengageOtherUser(userId) {
        let data = {
            id: userId,
            isInChat: false
        }

        return await this.userModel.updateInChatStatus(data);
    }

    async freeSelf() {
        let data = {
            id: this.id,
            wantsToChat: false
        }

        return await this.userModel.updateWantChatStatus(data);
    }

    async freeOtherUSer(id)
    {
        let data = {
            id: id,
            wantsToChat: false
        }

        return await this.userModel.updateWantChatStatus(data);
    }

    async establishChat(userId) {
        let data = new this.chatModel({
            to: userId,
            from: this.id,
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
                                await this.freeSelf();
                                callback(null);
                            }
                        } else{
                            callback(null);
                        }
                    } else {
                        await this.freeSelf();
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