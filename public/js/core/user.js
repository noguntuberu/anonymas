/*
 *
*/

export class User {
    constructor() {
        this.id = null;
        this.name = null;
        this.storageKey = 'user';
    }

    //
    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    //
    saveToLocalStorage(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    loadFromLocalStorage() {
        let data = JSON.parse(localStorage.getItem(this.storageKey));
        
        if(data) {
            this.setId(data.id);
            this.setName(data.name);
        }
    }

    removeFromLocalStorage() {
        localStorage.removeItem(this.storageKey);
    }
}