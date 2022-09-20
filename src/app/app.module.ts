import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './@core/core.module';

import { MaterialModule } from './material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MenuComponent } from './Components/Pages/menu/menu.component';
import { StudentAddComponent } from './Components/Pages/Student/student-add/student-add.component';
import { StudentListComponent } from './Components/Pages/Student/student-list/student-list.component';

import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FilterService, GridModule, GroupService, PageService, SortService } from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    StudentAddComponent,
    StudentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule,
    DropDownListAllModule,
    DatePickerAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    DateTimePickerModule,
  ],
  providers: [PageService, SortService, FilterService, GroupService, FilterService, SortService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
