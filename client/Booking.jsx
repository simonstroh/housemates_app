"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var Booking = /** @class */ (function (_super) {
    __extends(Booking, _super);
    function Booking(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isSubmitted: false,
            startDay: '',
            startMonth: '',
            startYear: '',
            endDay: '',
            endMonth: '',
            endYear: '',
            roomsAvailable: [],
            hasAdditionalResults: false,
            additionalResults: [],
            diffDays: 0
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleSelectChange = _this.handleSelectChange.bind(_this);
        _this.startEndDaysDifference = _this.startEndDaysDifference.bind(_this);
        return _this;
    }
    Booking.prototype.componentDidMount = function () {
        var date = new Date();
        var year = date.toString().split(' ')[3];
        this.setState({ startDay: '1', startMonth: '1', startYear: year, endDay: '1', endMonth: '1', endYear: year });
    };
    Booking.prototype.startEndDaysDifference = function () {
        var startDate = this.state.startMonth + "-" + this.state.startDay + "-" + this.state.startYear;
        var endDate = this.state.endMonth + "-" + this.state.endDay + "-" + this.state.endYear;
        var date1 = new Date(startDate);
        var date2 = new Date(endDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };
    Booking.prototype.handleSelectChange = function (event) {
        if (event.target.id === "day-start")
            this.setState({ startDay: event.target.value });
        else if (event.target.id === "month-start")
            this.setState({ startMonth: event.target.value });
        else if (event.target.id === "year-start")
            this.setState({ startYear: event.target.value });
        else if (event.target.id === "day-end")
            this.setState({ endDay: event.target.value });
        else if (event.target.id === "month-end")
            this.setState({ endMonth: event.target.value });
        else if (event.target.id === "year-end")
            this.setState({ endYear: event.target.value });
    };
    Booking.prototype.checkRooms = function (startDate, diffDays, body) {
        var _this = this;
        body.forEach(function (result) {
            console.log(result);
            var dateReceived = result.start_date.split('-');
            dateReceived.shift();
            var dateReversed = dateReceived.concat([result.start_date.split('-')[0]]).join('-');
            var date = new Date(dateReversed);
            var newDate = new Date(date.valueOf());
            newDate.setDate(newDate.getDate() + result.total_nights);
            var day = newDate.getDate();
            var month = newDate.getMonth() + 1;
            var year = newDate.getFullYear();
            var formattedDate = month + '-' + day + '-' + year;
            fetch("http://localhost:2004/rooms_available/" + formattedDate + "/" + (diffDays - result.total_nights))
                .then(function (res) { return res.json()
                .then(function (body) {
                if (body.length > 0) {
                    _this.setState({ hasAdditionalResults: true });
                    _this.setState({ additionalResults: _this.state.additionalResults.concat(body) });
                }
                _this.checkRooms(formattedDate, diffDays - result.total_nights, body);
            }); });
        });
    };
    Booking.prototype.handleSubmit = function () {
        var _this = this;
        this.setState({ isSubmitted: true });
        this.setState({ additionalResults: [] });
        this.setState({ hasAdditionalResults: false });
        var startDate = this.state.startMonth + "-" + this.state.startDay + "-" + this.state.startYear;
        var endDate = this.state.endMonth + "-" + this.state.endDay + "-" + this.state.endYear;
        var diffDays = this.startEndDaysDifference();
        fetch("http://localhost:2004/rooms_available/" + startDate + "/" + diffDays)
            .then(function (res) {
            res.json()
                .then(function (body) {
                console.log(body);
                console.log(typeof body);
                _this.setState({ roomsAvailable: body });
                _this.checkRooms(startDate, diffDays, body);
            });
        });
    };
    Booking.prototype.render = function () {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        var persons = [1, 2, 3, 4, 5, 6, 7, 8];
        var years = [];
        for (var i = 2018; i < 2050; i++) {
            years.push(i);
        }
        return (<div id="booking">
        <span>Arrival</span>
        <div id="start">
          <select id="month-start" onChange={this.handleSelectChange}>
            {months.map(function (month, index) { return (<option key={month.toLowerCase()} value={index + 1}>{month}</option>); })}
          </select>
          <select id="day-start" onChange={this.handleSelectChange}>
            {days.map(function (day, index) { return (<option key={day.toString()} value={index + 1}>{day}</option>); })}
          </select>
          <select id="year-start" onChange={this.handleSelectChange}>
            {years.map(function (year, index) { return (<option key={year.toString()} value={year.toString()}>{year}</option>); })}
          </select>
          <select id="persons" onChange={this.handleSelectChange}>
            {persons.map(function (person) { return (<option key={person.toString()} value={person.toString()}>{person}</option>); })}
          </select>
        </div>
        <span>Departure</span>
        <div id="end">
          <select id="month-end" onChange={this.handleSelectChange}>
            {months.map(function (month, index) { return (<option key={month.toLowerCase()} value={index + 1}>{month}</option>); })}
          </select>
          <select id="day-end" onChange={this.handleSelectChange}>
            {days.map(function (day, index) { return (<option key={day.toString()} value={index + 1}>{day}</option>); })}
          </select>
          <select id="year-end" onChange={this.handleSelectChange}>
            {years.map(function (year) { return (<option key={year.toString()} value={year.toString()}>{year}</option>); })}
          </select>
        </div>
        <img id="submit-button" onClick={this.handleSubmit} src="https://www.dropbox.com/s/mowwiz0k3s7dkco/arrow.png?raw=1" width="60px" height="60px"/>
        {this.state.isSubmitted &&
            <div className="booking-options">
              {this.state.roomsAvailable.map(function (room, index) { return (<div key={index}>
                    <span>{room.start_date}</span>
                    <span>{room.total_nights}</span>
                    <div className="room-available">
                      <img src={room.images} width="300px" height="200px"/>
                      <span style={{ fontStyle: 'italic', color: '#414141', padding: '15px 13px' }}>{room.address}</span>
                    </div>
                  </div>); })}
            </div>}
        {this.state.hasAdditionalResults &&
            <div id="additional-options">
            {this.state.additionalResults.map(function (room, index) { return (<div key={index}>
                  <span>{room.start_date}</span>
                  <span>{room.total_nights}</span>
                  <div className="room-available">
                    <img src={room.images} width="300px" height="200px"/>
                    <span style={{ fontStyle: 'italic', color: '#414141', padding: '15px 13px' }}>{room.address}</span>
                  </div>
                </div>); })}
          </div>}
      </div>);
    };
    return Booking;
}(React.Component));
exports["default"] = Booking;
