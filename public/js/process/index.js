/**
 * 
 */

import {User} from '../models/user.js';

window.addEventListener('load', function(){

    /** SOCKETS */
    const socket = io();

    /*  SOCKET LISTENERS    */
    socket.on('add-screen-name', (data) => {
        //
        const user = new User();
        user.saveToLocalStorage(data.body);
    });

    /* GET BUTTON */
    const addScreenNameBtn = document.getElementById('addScreenNameBtn');

    /* SAVE SCREEN NAME */
    if (addScreenNameBtn) {
        addScreenNameBtn.addEventListener('click', function(){
            /*  GET NAME FROM FORM */
            const nameInput = document.forms.login_form.screen_name;
            let screenName = nameInput.value;

            if(screenName.length < 1) {
                
            } else {
                /* store name to database */
                socket.emit('add-screen-name', {socket_id: socket.id, name: screenName});
            }
        });
    }
})