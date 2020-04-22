/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/

class GeneralUtilities {
    constructor () {}

    object_is_empty(object_to_check) {
        return Object.keys(object_to_check).length <= 0;
    }
}

module.exports = new GeneralUtilities;