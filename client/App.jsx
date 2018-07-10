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
var ReactDOM = require("react-dom");
var Booking_jsx_1 = require("./Booking.jsx");
var Header_jsx_1 = require("./Header.jsx");
var BookingWidget_jsx_1 = require("./BookingWidget.jsx");
var AddListing_jsx_1 = require("./AddListing.jsx");
var RemoveListing_jsx_1 = require("./RemoveListing.jsx");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            booking: true,
            removing: false,
            adding: false
        };
        _this.handleSelect = _this.handleSelect.bind(_this);
        return _this;
    }
    App.prototype.handleSelect = function (event) {
        if (event.target.id === "become-host") {
        }
        else if (event.target.id === "remove-listing") {
        }
    };
    App.prototype.render = function () {
        return (<div>
        <Header_jsx_1.default />
        <BookingWidget_jsx_1.default handleSelect={this.handleSelect}/>
        {this.state.booking && <Booking_jsx_1.default />}
        {this.state.adding && <AddListing_jsx_1.default />}
        {this.state.removing && <RemoveListing_jsx_1.default />}
      </div>);
    };
    return App;
}(React.Component));
ReactDOM.render(<App />, document.getElementById('app'));
