import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '@environment';
var httpOptions = {
    headers: new HttpHeaders({
        'content-type': 'application/json',
        accept: 'application/json',
        rejectUnauthorized: 'false'
    })
};
var CoursService = /** @class */ (function () {
    function CoursService(http) {
        this.http = http;
    }
    CoursService.prototype.getAllWeek = function () {
        return this.http.get(API_URL + "/cour", httpOptions);
    };
    CoursService.prototype.getWeekByDate = function (date) {
        var urlApi = API_URL + "/cour/" + date;
        return this.http.get("" + urlApi, httpOptions);
    };
    CoursService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CoursService);
    return CoursService;
}());
export { CoursService };
//# sourceMappingURL=cours.service.js.map