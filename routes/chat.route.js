/**
 * 
 */
const   express = require('express'),
        chatModel = require('../models/chat.model.js');

const   router = express.Router();

/**
 * GET
 */

router.get('/:userId', (req, res) => {
    let userId = req.params.userId;
    chatModel.getChat(userId, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.parse(data));
        }
    });
});

/**
 *  POST
 */
router.post('/', (req, res) => {
    let conversation = new chatModel ({
        to: req.body.to,
        from: req.body.from,
        isActive: true
    });
    chatModel.addChat(conversation, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.parse(data));
        }
    });
});

 /**
  *  DELETE
  */

router.delete('/:id', (req, res) => {
    let chatId = req.params.id;

    chatModel.endChat(chatId, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.parse(data));
        }
    });
});


//
module.exports = router;