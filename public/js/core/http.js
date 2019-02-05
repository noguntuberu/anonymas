/**
 * Author: Oguntuberu Nathan O.
 * Date: 31 - 12 - 2018
 */

 export class Http {
    constructor() {
        this.http = null;
        this.response = '';
        this.errorCode = 0;
        this.errorMessage = '';
    }
    getInstance() {
        if(this.http === null) {
            if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
                this.http = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE 6 and older
                this.http = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
    }
    setHeaders(headers = {}) {
        if(headers !== {} ) {
            for (let header in headers) {
                this.http.setRequestHeader(header, headers[header]);
            }
        }
    }
    setResponse(response) {
        console.log('response set: ' + response);
        this.response = response;
    }
    getResponse(){
        console.log('response: '+ this.response);
        return this.response;
    }
    /**
     * 
     */
    get(uri, async = true) {
        this.getInstance();
        this.http.open('GET', uri, async);
        this.http.send(null);

        this.http.onreadystatechange = () => {
            if (this.http.readyState === 4)
            {
                if (this.http.status === 200)
                {
                    this.response = this.http.responseText;
                    return true;
                }
            }
            //  Set any errors
            this.errorCode = this.http.status;
            this.errorMessage = this.http.responseText;
        }

        return false;
    }

    /**
     * 
     */
    async post(uri, data = null,  headers = {}, async = true) {
        this.getInstance();
        this.http.open('POST', uri, async);
        this.setHeaders(headers);
        this.http.send(data);

        this.http.onreadystatechange = () => {
            if (this.http.readyState === 4)
            {
                if (this.http.status === 200)
                {
                   this.response = this.http.response;
                   console.log(this.response);
                }else {
                    this.errorCode = -1;
                    this.setResponse('Failed');
                }
            }
        }

        console.log('returned response: ' + this.response);
    }
 }