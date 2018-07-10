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
var Account = /** @class */ (function (_super) {
    __extends(Account, _super);
    function Account(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Account.prototype.handleSubmit = function () {
    };
    Account.prototype.render = function () {
        return (<div id="account-dropdown" onMouseLeave={this.props.displaySettings}>
        <form id="login" onSubmit={this.handleSubmit}>
          Email Address
          <input type="text"/>
          Password
          <input type="password"/>
        </form>
        <a href="#">Create an Account</a>
        <a href="#">Sign-in</a>
      </div>);
    };
    return Account;
}(React.Component));
exports["default"] = Account;
