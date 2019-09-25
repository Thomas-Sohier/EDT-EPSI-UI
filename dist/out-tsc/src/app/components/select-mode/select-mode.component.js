import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var SelectModeComponent = /** @class */ (function () {
    function SelectModeComponent(router) {
        this.router = router;
        this.activeLinkIndex = -1;
        this.navLinks = [
            {
                label: 'Planning',
                link: './nextDayPlanning',
                index: 0
            },
            {
                label: 'Tranches horaires',
                link: './globalStat',
                index: 1
            },
            {
                label: 'Répartition prof',
                link: './timeProfGraph',
                index: 2
            }
        ];
    }
    SelectModeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (res) {
            _this.activeLinkIndex = _this.navLinks.indexOf(_this.navLinks.find(function (tab) { return tab.link === '.' + _this.router.url; }));
        });
    };
    SelectModeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-select-mode',
            templateUrl: './select-mode.component.html',
            styleUrls: ['./select-mode.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], SelectModeComponent);
    return SelectModeComponent;
}());
export { SelectModeComponent };
//# sourceMappingURL=select-mode.component.js.map