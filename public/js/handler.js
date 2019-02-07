/**
 * 
 */
import './core/jquery.js';
import {User} from './core/user.js';
import {Chat} from './core/chat.js';
import {Room} from './core/room.js';
import {System} from './core/system.js';

window.addEventListener('load', function(){

    /* */
    const system = new System();
    

    /** SOCKETS */
    const socket = io();

    /* GET BUTTON */
    const addScreenNameBtn = document.getElementById('addScreenNameBtn');
    const startChatBtn = document.getElementById('startChatBtn');

    /* SAVE SCREEN NAME */
    if (addScreenNameBtn) {
        //
        if(system.doesUserExist()) {
            window.location = './start.html';
        }


        const user = new User();
        user.removeFromLocalStorage();

        addScreenNameBtn.addEventListener('click', () => {

            //
            const nameInput = document.forms.login_form.screen_name;
            let screenName = nameInput.value;

            if(screenName.length >= 1) {
                system.displayToast('Adding... Please wait');
                socket.emit('add-screen-name', {socket_id: socket.id, name: screenName});

                socket.on('add-screen-name', data => {
                    //
                    if(data.code) {
                        const user = new User();
                        user.saveToLocalStorage(data.body);
                        window.location = '/start.html';
                    } else {
                        system.displayToast('Could not add user');
                    }
                });
            } else {
                system.displayToast('Please enter a name');
            }
        });
    }

    /*  START A CHAT */
    if(startChatBtn) {
        //
        if(!system.doesUserExist()) {
            window.location = './index.html';
        }

        startChatBtn.addEventListener('click', () => {
            const user = new User();
            user.loadFromLocalStorage();

            system.displayToast('Searching for available users');

            let userInfo = {id: user.getId(), name: user.getName(), socket: socket.id};
            socket.emit('start-chat', userInfo);

            socket.on('start-chat', data => {
                const chat = new Chat();

                if (!data.code) {
                    system.displayToast('No available user(s). Try again');
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
        if(!system.doesChatExist()) {
            window.location = '/start.html';
        }

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
            chatRoom.addMessage(data.message, true);
        });

        socket.on('leave-chat', () => {
            //
            system.displayToast('User has left chat');
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
            msgInput.value = '';

            if(message.length >= 1) {
                socket.emit('new-message', {room: chat.getId(), message: message});
                chatRoom.addMessage(message);
            }
        });
    }
})