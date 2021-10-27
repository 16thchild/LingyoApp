'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var BrowserTab = /** @class */ (function (_super) {
    tslib.__extends(BrowserTab, _super);
    function BrowserTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserTab.prototype.isAvailable = function () { return core.cordova(this, "isAvailable", {}, arguments); };
    BrowserTab.prototype.openUrl = function (url) { return core.cordova(this, "openUrl", {}, arguments); };
    BrowserTab.prototype.close = function () { return core.cordova(this, "close", {}, arguments); };
    BrowserTab.pluginName = "BrowserTab";
    BrowserTab.plugin = "cordova-plugin-browsertab";
    BrowserTab.pluginRef = "cordova.plugins.browsertab";
    BrowserTab.repo = "https://github.com/google/cordova-plugin-browsertab";
    BrowserTab.platforms = ["Android", "iOS"];
    BrowserTab.decorators = [
        { type: core$1.Injectable }
    ];
    return BrowserTab;
}(core.IonicNativePlugin));

exports.BrowserTab = BrowserTab;
