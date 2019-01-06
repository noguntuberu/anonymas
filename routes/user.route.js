/**
 * 
 */
const   express = require('express'),
        userModel = require('../models/user.model.js');

const   router = express.Router();

/**
 * GET
 */
router.get('/', (req, res) => {
    userModel.getAllUsers((err, data) => {
        if (err) {
            res.send('Error');
        }else {
            res.send(data);
        }
    });
});

router.get('/free/:id', (req, res) => {
    let id = req.params.id;

    userModel.getFreeUser(id, (err, data)=> {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

router.get('/in-chat/:id', (req, res) => {
    let id = req.params.id;

    userModel.getInChatStatus(id, (err, data)=> {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

router.get('/socket/:id', (req, res) => {
    let id = req.params.id;

    userModel.getSocketId(id, (err, data)=> {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

router.get('/want-chat/:id', (req, res) => {
    let id = req.params.id;

    userModel.getWantChatStatus(id, (err, data)=> {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

/** 
 * POST
 */
router.post('/', (req, res) => {
    let newUser = new userModel({
        name: req.body.name,
        socket: '',
        wantsToChat: false,
        isInChat: false
    });

    userModel.addNewUser(newUser, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

/**
 *  PUT
 */

 router.put('/:id', (req, res) => {
    let userData = {
        id: req.params.id,
        name: req.body.name,
        socket: req.body.socket? req.body.socket : '',
        wantsToChat: req.body.wantsToChat,
        isInChat: req.body.isInChat
    };

    userModel.updateUserInfo(userData, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
 });

 router.put('/in-chat/:id', (req, res) => {
    let newData = {
        id: req.params.id,
        isInChat: req.body.value
    };

    userModel.updateInChatStatus(newData, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
 });

 router.put('/socket/:id', (req, res) => {
    let newData = {
        id: req.params.id,
        socket: req.body.value
    };

    userModel.updateSocketId(newData, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
 });

 router.put('/want-chat/:id', (req, res) => {
    let newData = {
        id: req.params.id,
        wantsToChat: req.body.value
    };

    userModel.updateWantChatStatus(newData, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
 });

/**
 *  DELETE
 */
router.delete('/', (req, res) => {
    userModel.removeAllUsers((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

/**
 *  EXPORT
 */
module.exports = router;