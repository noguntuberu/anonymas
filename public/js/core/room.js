/**
 * @author Oguntuberu Nathan O.
 */

export class Room {
    constructor()
    {
        this.statBar = document.getElementById('chat-info-bar');
        this.messageList = document.getElementById('chat-messages');
    }

    updateStatBar(message) {
        this.statBar.innerHTML = message;
    }

    addMessage(message, isIncoming = false) {
        const div = document.createElement('div');
        let className = isIncoming ? 'chat-message' : 'chat-message msg-out';

        div.setAttribute('class', className);
        div.innerHTML = message;
        
        this.messageList.appendChild(div);
    }
}