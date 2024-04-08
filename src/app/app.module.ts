import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CheckActivationcodeModalComponent } from './check-activationcode-modal/check-activationcode-modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import {NgAlertBoxComponent} from "ng-alert-box-popup";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ShowNewsDetailsModalComponent } from './show-news-details-modal/show-news-details-modal.component';
import { ShowExerciseDetailsModalComponent } from './show-exercise-details-modal/show-exercise-details-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AccountRegistrationComponent,
    HomePageComponent,
    CheckActivationcodeModalComponent,
    SideMenuComponent,
    ShowNewsDetailsModalComponent,
    ShowExerciseDetailsModalComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
