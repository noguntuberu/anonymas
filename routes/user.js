/**
 * 
 */
const   express = require('express'),
        userModel = require('../models/user.model');

const   router = express.Router();

/**
 * GET
 */
router.get('/', (req, res) => {
    res.send('GET User');
});

/** 
 * POST
 */
router.post('/', (req, res) => {
    let data = new userModel({
        name: req.body.name,
        socket: '',
        wantsToChat: false,
        isInChat: false
    });
    
});

//
module.exports = router;