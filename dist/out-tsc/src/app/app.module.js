import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalStatComponent } from './components/global-stat/global-stat.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NextDayPlanningComponent } from './components/next-day-planning/next-day-planning.component';
import { SelectModeComponent } from './components/select-mode/select-mode.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TimeProfComponent } from './components/time-prof/time-prof.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent, GlobalStatComponent, NextDayPlanningComponent, SelectModeComponent, TimeProfComponent],
            imports: [
                BrowserModule,
                HttpClientModule,
                AppRoutingModule,
                MatToolbarModule,
                BrowserAnimationsModule,
                MatCardModule,
                MatTabsModule,
                MatListModule,
                MatIconModule,
                MatButtonModule
            ],
            providers: [],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map