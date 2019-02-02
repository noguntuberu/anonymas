/**
 * 
 */

import {User} from './core/user.js';
import {Chat} from './core/chat.js';
import {Room} from './core/room.js';

window.addEventListener('load', function(){

    /** SOCKETS */
    const socket = io();

    /* GET BUTTON */
    const addScreenNameBtn = document.getElementById('addScreenNameBtn');
    const startChatBtn = document.getElementById('startChatBtn');

    /* SAVE SCREEN NAME */
    if (addScreenNameBtn) {
        addScreenNameBtn.addEventListener('click', () => {

            //
            const nameInput = document.forms.login_form.screen_name;
            let screenName = nameInput.value;

            if(screenName.length >= 1) {
                socket.emit('add-screen-name', {socket_id: socket.id, name: screenName});

                socket.on('add-screen-name', data => {
                    //
                    const user = new User();
                    user.saveToLocalStorage(data.body);
                    window.location = '/start.html';
                });
            }
        });
    }

    /*  START A CHAT */
    if(startChatBtn) {
        startChatBtn.addEventListener('click', () => {
            const user = new User();
            user.loadFromLocalStorage();

            let userInfo = {id: user.getId(), name: user.getName(), socket: socket.id};
            socket.emit('start-chat', userInfo);

            socket.on('start-chat', data => {
                const chat = new Chat();

                if (!data.code) {
                    
                } else {
                    chat.saveToLocalStorage(data.body);
                    window.location = '/chat.html';
                }
            });
        });
    }

    /*  CHAT    */
    const chatPage = document.getElementById('chat');
    if(chatPage) {
        //
        const user = new User();
        const chat = new Chat();
        const chatRoom = new Room();

        user.loadFromLocalStorage();
        chat.loadFromLocalStorage();

        socket.emit('join', {room: chat.getId()});

        socket.on('typing', () => {
            //
            chatRoom.updateStatBar('is typing');
        });

        socket.on('not-typing', () => {
            //
            chatRoom.updateStatBar('');
        });

        socket.on('new-message', data => {
            chatRoom.updateStatBar('');
        });

        socket.on('leave-chat', () => {
            //
            console.log('leaving');
        });
        
        //Get Elements
        const leaveBtn = document.getElementById('leave-btn');
        const msgForm = document.forms.chat_form;
        const msgInput = msgForm.chat_form_text;
        const sendBtn = msgForm.chat_form_btn;

        //Handle
        leaveBtn.addEventListener('click', () => {
            socket.emit('leave-chat', {
                user: user.getId(), 
                chat: chat.getId(), 
                otherUser: chat.getOtherUser()
            });

            chat.removeFromLocalStorage();
            window.location = '/start.html';
        });

        msgInput.addEventListener('input', () => {
            if(msgInput.value.length < 1 ) {
                socket.emit('not-typing', chat.getId());
            } else {
                socket.emit('typing', chat.getId());
            }
        });

        sendBtn.addEventListener('click', () => {
            const message = msgInput.value;

            if(message.length >= 1) {
                socket.emit('new-message', {room: chat.getId(), message: message});
            }
        });
    }
})