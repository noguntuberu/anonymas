/**
 * 
 */

const GeneralUtility = require('./General');
class Queue {
    constructor () {
        this.head = null;
        this.tail = null;
        this.queue = {};
    }

    shift () {
        if (GeneralUtility.object_is_empty(this.queue)) {
            return null;
        }

        const head = this.queue[this.head];
        delete this.queue[this.head];
        this.head = null;

        for (let key in this.queue) {
            this.head = key;
            break;
        }

        return head;
    }

    push (key, value = undefined) {
        if (!value) value = key;

        if(GeneralUtility.object_is_empty(this.queue)) {
            this.head = key;
            this.tail = key;
            this.queue[key] = value;
            return;
        }

        this.tail = key;
        this.queue[key] = value;
    }

    has (key) {
        return this.queue[key];
    }

    delete (key) {
        delete this.queue[key];
        const keys = Object.keys(this.queue);
        this.head = keys[0];
        this.tail = keys[keys.length - 1];
    }
}

module.exports = Queue;