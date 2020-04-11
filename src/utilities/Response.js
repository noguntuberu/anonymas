/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */

class ResponseHelper {
    constructor () {}
    process_failed_response(message) {
        return {
            success: false,
            error: message,
            payload: null
        }
    }
    process_success_response(payload) {
        return {
            success: true,
            payload,
            error: null
        }
    }
}

module.exports = new ResponseHelper;