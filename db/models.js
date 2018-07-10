var db = require('./index.js');
function oneHundredRooms(view, callback) {
    var params = [view.zip];
    db.query('SELECT * FROM rooms_available WHERE zip=$1 LIMIT 100', params, function (err, result) {
        if (err)
            console.error(err);
        callback(null, result);
    });
}
function bookingRooms(booking, callback) {
    console.log("Request being made for", booking.startDate, booking.totalNights);
    var params = [booking.startDate, JSON.parse(booking.totalNights)];
    db.query("SELECT *\n    FROM rooms_available\n    WHERE start_date=$1 AND total_nights<=$2 AND available='1'\n    ", params, function (err, result) {
        if (err)
            console.error(err);
        callback(null, result.rows);
    });
}
function insertUser(user) {
    db.query("INSERT INTO users\n         (name, email, password, phone_number)\n         VALUES\n         (" + user.name + ", " + user.email + ", " + user.password + ", " + user.phoneNumber + ")\n        ", function (err, result) {
        if (err)
            console.error(err);
    });
}
function insertRoom(room) {
    db.query("INSERT INTO rooms_available\n         (user_id, title, address, host,\n         bedrooms, beds, amenities, dates,\n         start_date, images, score, total_nights,\n         available)\n         VALUES\n         (" + room.userId + ", " + room.title + ",\n         " + room.address + ", " + room.host + ",\n         " + room.bedrooms + ", " + room.beds + ",\n         " + room.amenities + ", " + room.dates + ",\n         " + room.startDate + ", " + room.images + ",\n         " + room.score + ", " + room.totalNights + ", 1)\n         ", function (err, result) {
        if (err)
            console.error(err);
    });
}
module.exports = {
    oneHundredRooms: oneHundredRooms,
    bookingRooms: bookingRooms,
    insertUser: insertUser,
    insertRoom: insertRoom
};
