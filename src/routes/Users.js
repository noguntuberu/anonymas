/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */

const express = require('express');
const Router = express.Router();
const UserService = require('../services/User/User');
const FavoriteService = require('../services/User/Favorites');

Router.post('/user', async (req, res, next) => {
    try {
        return res.json( await UserService.create_user(req));
    } catch (error) {
        next(error);
    }
});

Router.get('/:user_id/favorites', async (req, res, next) => {
    try {
        return res.json ( await FavoriteService.fetch_favorites(req));
    } catch (error) {
        next(error);
    }
});

Router.get('/xyzabc-anonymas-xyzabc', async (req, res, next) => {
    try {
        return res.json( await UserService.fetch_users());
    } catch (error) {
        next(error);
    }
});

module.exports = Router;