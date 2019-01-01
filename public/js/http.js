/**
 * Author: Oguntuberu Nathan O.
 * Date: 31 - 12 - 2018
 */

 export class Http {
    constructor() {
        this.http = null;
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
            for (header in headers) {
                this.http.setRequestHeader(header, headers.header);
            }
        }
    }

    /**
     * 
     */
    get(uri, async = true) {
        this.getInstance();
        this.http.open('GET', uri, async);
        this.http.send();

        this.http.onreadystatechange = () => {
            if (this.http.readyState === 4)
            {
                if (this.http.status === 200)
                {
                    return this.http.responseText;
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
    post(uri, data = null,  headers = {}, async = true) {
        this.getInstance();
        this.http.open('GET', uri, async);
        this.setHeaders(headers);
        this.send(data);

        this.http.onreadystatechange = () => {
            if (this.http.readyState === 4)
            {
                if (this.http.status === 200)
                {
                    return this.http.responseText;
                }
            }
            //  Set any errors
            this.errorCode = this.http.status;
            this.errorMessage = this.http.responseText;
        }

        return false;
    }
 }