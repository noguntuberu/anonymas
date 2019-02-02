/**
 * @author Oguntuberu Nathan O.
 */

class Room {
    constructor()
    {
        this.statBar = document.getElementById('chat-info-bar');
        this.messageList = document.getElementById('chat-messages');
    }

    updateStatBar(message) {
        this.statBar.innerHTML = message;
    }
}

module.exports = Room;