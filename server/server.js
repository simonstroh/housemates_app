var express = require('express');
var path = require('path');
var parser = require('body-parser');
var externals = require('./request-handler');
var cors = require('cors');
var app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(parser.json());
app.use(cors());
app.get('/rooms-available/:date/:nights', function (req, res) {
    console.log("Recevied request type GET for available rooms", req.params.date, req.params.nights, typeof req.params.date, typeof req.params.nights);
    var date = req.params.date;
    var dateParsing = date.split('-');
    dateParsing.pop();
    if (dateParsing[0].length < 2)
        dateParsing[0] = '0' + dateParsing[0];
    var parsedDate = [date.split('-')[2]].concat(dateParsing).join('-');
    var nights = req.params.nights;
    var body = {
        startDate: parsedDate,
        totalNights: nights
    };
    externals['/rooms-available'](res, body);
});
app.post('/users', function (req, res) {
    externals[req.url](req, res);
});
app.post('/rooms-available/post', function (req, res) {
    externals[req.url];
});
app.listen(2004);
