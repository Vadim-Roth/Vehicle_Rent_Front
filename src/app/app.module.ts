import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomepgComponent } from './components/homepg/homepg.component';
import { UsersModule } from './users/users.module';
import { PreviousSearchesComponent } from './components/previous-searches/previous-searches.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomepgComponent,
    PreviousSearchesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UsersModule,
    DpDatePickerModule 
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
