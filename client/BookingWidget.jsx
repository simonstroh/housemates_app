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
var BookingWidget = /** @class */ (function (_super) {
    __extends(BookingWidget, _super);
    function BookingWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isSelected: false
        };
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        return _this;
    }
    BookingWidget.prototype.handleClick = function () {
        this.setState({ isSelected: true });
    };
    BookingWidget.prototype.handleMouseLeave = function () {
        this.setState({ isSelected: false });
    };
    BookingWidget.prototype.render = function () {
        return (<div id="widget">
        <img onClick={this.handleClick} src="widget.svg" width="auto" height="28px"/>
        {this.state.isSelected &&
            <ul className="widget-dropdown" onMouseLeave={this.handleMouseLeave}>
              <li id="become-host" onClick={this.props.handleSelect}>Become a Host</li>
              <li id="remove-listing" onClick={this.props.handleSelect}>Remove a Listing</li>
            </ul>}
      </div>);
    };
    return BookingWidget;
}(React.Component));
exports["default"] = BookingWidget;
