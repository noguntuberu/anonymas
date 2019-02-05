/**
 * @author Oguntuberu Nathan O.
 */

export class System {
    //
    doesUserExist() {
        return localStorage.getItem('user');
    }

    doesChatExist(){
        return localStorage.getItem('chat');
    }

    displayToast(message) {
        const docBody = document.body;
        const toastDiv = document.createElement('div');
        toastDiv.setAttribute('class', 'toast');
        toastDiv.innerHTML = message; 
        docBody.appendChild(toastDiv);

        $(toastDiv).fadeIn(500, 'linear').delay(1000).fadeOut(800, 'linear', () => {
            docBody.removeChild(toastDiv);
        });
    }
}