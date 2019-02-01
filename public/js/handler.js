/**
 * 
 */

import {User} from './core/user.js';
import {Chat} from './core/chat.js';

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

        user.loadFromLocalStorage();
        chat.loadFromLocalStorage();

        socket.emit('join', {room: chat.getId()});

        socket.on('typing', () => {
            //
            console.log('typing');
        });

        socket.on('new-message', data => {
            console.log('incoming message');
        });
        
        //Get Elements
        const leaveBtn = document.getElementById('leave-btn');
        const msgForm = document.forms.chat_form;
        const msgInput = msgForm.chat_form_text;
        const sendBtn = msgForm.chat_form_btn;

        //Handle
        leaveBtn.addEventListener('click', () => {
            socket.emit('leave-chat', {user: user.getId(), chat: chat.getId()});
            socket.on('leave-chat', () => {
                chat.removeFromLocalStorage();
                window.location = '/start';
            });
        });

        msgInput.addEventListener('input', () => {
            socket.emit('typing', chat.getId());
        });

        sendBtn.addEventListener('click', () => {
            const message = msgInput.value;

            if(message.length >= 1) {
                socket.emit('new-message', {room: chat.getId(), message: message});
            }
        });
    }
})