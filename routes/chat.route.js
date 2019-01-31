/**
 * 
 */
const   express = require('express'),
        chatModel = require('../models/chat.model.js');

const   router = express.Router();

/**
 * GET
 */

router.get('/:userId', async (req, res) => {
    let userId = req.params.userId;
    res.send( await chatModel.getChat(userId));
});

/**
 *  POST
 */
router.post('/', async (req, res) => {
    let conversation = new chatModel ({
        to: req.body.to,
        from: req.body.from,
        isActive: true
    });
    res.send( await chatModel.addChat(conversation));
});

 /**
  *  DELETE
  */

router.delete('/:id', async (req, res) => {
    let chatId = req.params.id;

    res.send( await chatModel.endChat(chatId));
});


//
module.exports = router;