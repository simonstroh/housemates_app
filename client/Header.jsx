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
var Account_jsx_1 = require("./Account.jsx");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            account: false,
            bookings: false,
            search: false,
            searchstring: ''
        };
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        return _this;
    }
    Header.prototype.handleChange = function () {
    };
    Header.prototype.handleMouseOver = function () {
        this.setState({ account: true });
    };
    Header.prototype.handleMouseLeave = function () {
        this.setState({ account: false });
    };
    Header.prototype.render = function () {
        return (<div id="header">
        <div id="logo">Housemates</div>
        <div>
          <ul className="header-items">
            <li onClick={this.handleMouseOver} style={{ display: 'flex', justifyContent: 'center' }}>
              Account
              {this.state.account && <Account_jsx_1.default displaySettings={this.handleMouseLeave}/>}
            </li>
            <li>Bookings</li>
            <li>
              <div id="search">
                <img src="search.svg" width="20px" height="20px"/>
                <input onChange={this.handleChange} type="text" value={this.state.searchstring || "Search"}>
                </input>
              </div>
            </li>
          </ul>
        </div>
      </div>);
    };
    return Header;
}(React.Component));
exports["default"] = Header;
