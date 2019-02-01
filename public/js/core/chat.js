/**
 * 
 */

export class Chat {
    constructor() {
        this.id = null;
        this.otherUser = null;
        this.storageKey = 'chat';
    }

    //
    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setOtherUser(userId) {
        this.otherUser = userId;
    }

    getOtherUser() {
        return this.otherUser;
    }

    //
    saveToLocalStorage(info) {
        localStorage.setItem(this.storageKey, JSON.stringify(info));
    }

    loadFromLocalStorage() {
        const info = JSON.parse(localStorage.getItem(this.storageKey));
        
        if(info) {
            this.setId(info.id);
            this.setOtherUser(info.other);
        }
    }

    removeFromLocalStorage() {
        localStorage.removeItem(this.storageKey);
    }
}