/**
 * 
 */
const   express = require('express'),
        userModel = require('../models/user.model.js');

const   router = express.Router();

/**
 * GET
 */
router.get('/', async (req, res) => {
    res.send( await userModel.getAllUsers());
});

router.get('/free/:id', async (req, res) => {
    let id = req.params.id;

    res.send( await userModel.getFreeUser(id));
});

router.get('/in-chat/:id', async (req, res) => {
    let id = req.params.id;

    res.send( await userModel.getInChatStatus(id));
});

router.get('/socket/:id', async (req, res) => {
    let id = req.params.id;

    res.send( await userModel.getSocketId(id));
});

router.get('/want-chat/:id', async (req, res) => {
    let id = req.params.id;

    res.send( await userModel.getWantChatStatus(id));
});

/** 
 * POST
 */
router.post('/', async (req, res) => {
    let newUser = new userModel({
        name: req.body.name,
        socket: '',
        wantsToChat: false,
        isInChat: false
    });

    res.send(await userModel.addNewUser(newUser));
});

/**
 *  PUT
 */

 router.put('/:id', async (req, res) => {
    let userData = {
        id: req.params.id,
        name: req.body.name,
        socket: req.body.socket? req.body.socket : '',
        wantsToChat: req.body.wantsToChat,
        isInChat: req.body.isInChat
    };

    res.send( await userModel.updateUserInfo(userData));
 });

 router.put('/in-chat/:id', async (req, res) => {
    let newData = {
        id: req.params.id,
        isInChat: req.body.value
    };

    res.send( await userModel.updateInChatStatus(newData));
 });

 router.put('/socket/:id', async (req, res) => {
    let newData = {
        id: req.params.id,
        socket: req.body.value
    };

    res.send( await userModel.updateSocketId(newData));
 });

 router.put('/want-chat/:id', async (req, res) => {
    let newData = {
        id: req.params.id,
        wantsToChat: req.body.value
    };

    res.send( await userModel.updateWantChatStatus(newData));
 });

/**
 *  DELETE
 */
router.delete('/', async (req, res) => {
    res.send( await userModel.removeAllUsers());
});

/**
 *  EXPORT
 */
module.exports = router;