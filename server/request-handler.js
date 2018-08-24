var _a = require('../db/models.js'), oneHundredRooms = _a.oneHundredRooms, bookingRooms = _a.bookingRooms, insertUser = _a.insertUser, insertRoom = _a.insertRoom;
var externals = {
    '/rooms-available': function (res, body) {
        if (!body) {
            var rooms = oneHundredRooms();
            res.send(rooms);
        }
        else {
            bookingRooms(body, function (err, response) {
                if (err)
                    console.error(err);
                else
                    res.send(response);
            });
        }
    },
    '/users/post': function (req, res) {
        var user = req.body;
        insertUser(user);
    },
    '/rooms-available/post': function (req) {
        var room = req.body;
        insertRoom(room);
    }
};
module.exports = externals;
