/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/

const FavoriteControl = require('../../controllers/Favorite');
const UserControl = require('../../controllers/User');
const ResponseHelper = require('../../utilities/Response');

class FavoriteService {
    constructor () {
        this.control = FavoriteControl;
        this.favorites = {}

        this.load_server_object();
    }

    async load_server_object () {
        const faves_retrieval = await this.control.read_many({});
        faves_retrieval.payload.forEach( favorite => {
            this.add_to_server_object(favorite);
        });
    }

    add_to_server_object (data) {
        const { from_user, to_user } = data;
        if (!this.favorites[to_user]) this.favorites[to_user] = {};
        this.favorites[to_user][from_user] = from_user;
    }

    remove_from_server_object(data) {
        const { from_user, to_user } = data;
        if (!this.favorites[to_user] || !this.favorites[to_user][from_user]) return;
        delete this.favorites[to_user][from_user];
    }

    async add_favorite(data) {
        const { from_user, to_user } = data;

        if (!from_user || !to_user ) return ResponseHelper.process_failed_response(`Invalid data supplied.`);

        /** Probe if fave record between users exits */
        const fave_retrieval = await this.control.read_one({ from_user, to_user });
        if (fave_retrieval.success) {
            return fave_retrieval;
        }

        /** Create record if not exist */
        const fave_creation = await this.control.create({ from_user, to_user });
        if (fave_creation.success) this.add_to_server_object({ from_user, to_user });

        return fave_creation;
    }

    async fetch_favorites(request) {
        const from_user = request.params.user_id;
        const user_favorites = await this.control.read_many({ from_user });
        if ( !user_favorites.success ) return user_favorites;
        
        const fave_ids = user_favorites.payload.map( fave =>  fave.to_user);
        return await UserControl.read_many({ _id: fave_ids.join()});
    }

    async remove_favorite(data) {
        const { from_user, to_user } = data;
        if (!from_user || !to_user ) return ResponseHelper.process_failed_response(`Invalid data supplied.`);

        const fave_removal = await this.control.delete_one({ from_user, to_user });
        if (fave_removal.success) this.remove_from_server_object({ from_user, to_user });

        return fave_removal;
    }
}

module.exports = new FavoriteService;