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
import { ProgramsPageComponent } from './programs-page/programs-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { ActivityLogPageComponent } from './activity-log-page/activity-log-page.component';
import { ShowProgramDetailsModalComponent } from './show-program-details-modal/show-program-details-modal.component';
import { CreateProgramModalComponent } from './create-program-modal/create-program-modal.component';
import { ParticipateInProgramModalComponent } from './participate-in-program-modal/participate-in-program-modal.component';
import { MyProgramsComponent } from './my-programs/my-programs.component';
import { ShowProgramsMessagesComponent } from './show-programs-messages/show-programs-messages.component';
import { NewProgramsMessageModalComponent } from './new-programs-message-modal/new-programs-message-modal.component';
import { AddCommentModalComponent } from './add-comment-modal/add-comment-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AccountRegistrationComponent,
    HomePageComponent,
    CheckActivationcodeModalComponent,
    SideMenuComponent,
    ShowNewsDetailsModalComponent,
    ShowExerciseDetailsModalComponent,
    ProgramsPageComponent,
    CategoriesPageComponent,
    MessagesPageComponent,
    AccountPageComponent,
    ActivityLogPageComponent,
    ShowProgramDetailsModalComponent,
    CreateProgramModalComponent,
    ParticipateInProgramModalComponent,
    MyProgramsComponent,
    ShowProgramsMessagesComponent,
    NewProgramsMessageModalComponent,
    AddCommentModalComponent
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
