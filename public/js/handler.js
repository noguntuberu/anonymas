/**
 * 
 */

import {User} from './core/user.js';

window.addEventListener('load', function(){

    /** SOCKETS */
    const socket = io();

    /*  SOCKET LISTENERS    */
    socket.on('add-screen-name', (data) => {
        //
        const user = new User();
        user.saveToLocalStorage(data.body);
        window.location = '/start.html';
    });

    socket.on('start-chat', (data) => {
        alert('recieved');
    });

    /* GET BUTTON */
    const addScreenNameBtn = document.getElementById('addScreenNameBtn');
    const startChatBtn = document.getElementById('startChatBtn');
    //const sendMessageBtn = document.getElementById('');

    /* SAVE SCREEN NAME */
    if (addScreenNameBtn) {
        addScreenNameBtn.addEventListener('click', () => {

            //
            const nameInput = document.forms.login_form.screen_name;
            let screenName = nameInput.value;

            if(screenName.length >= 1) {
                socket.emit('add-screen-name', {socket_id: socket.id, name: screenName});
            }
        });
    }

    /*  START A CHAT */
    if(startChatBtn) {
        startChatBtn.addEventListener('click', () => {
            const user = new User();
            user.loadDataFromLocalStorage();

            let userInfo = {id: user.getId(), name: user.getName(), socket: socket.id};
            socket.emit('start-chat', userInfo);
        });
    }
})