/*
 *
*/

export class User {
    constructor() {
        this.id = null;
        this.name = null;
    }

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

    saveToLocalStorage(data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    loadDataFromLocalStorage() {
        let data = JSON.parse(localStorage.getItem('user'));
        
        if(data) {
            this.setId(data.id);
            this.setName(data.name);
        }
    }
}