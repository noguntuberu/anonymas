/**
 * 
 */
//var io = io();

import {Http} from './http.js';
import {User} from './user.js';

window.addEventListener('load', function(){

    /** SOCKETS */
    const socket = io();

    /**
     * GET BUTTONS
     */
    const addScreenNameBtn = document.getElementById('addScreenNameBtn');


    /**
     * SAVE SCREEN NAME
     */
    if (addScreenNameBtn) {
        addScreenNameBtn.addEventListener('click', function(){
            /*  GET NAME FROM FORM */
            const nameInput = document.forms.login_form.screen_name;
            let screenName = nameInput.value;

            if(screenName.length < 1) {
                
            } else {
                /* store name to database */
                socket.emit('add-screen-name', {socketId: socket.id, name: screenName});
            }
        });
    }
})