import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { ProgramsPageComponent } from './programs-page/programs-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { ActivityLogPageComponent } from './activity-log-page/activity-log-page.component';
import { IsLoggedinService } from './is-loggedin.service';
import { ShowProgramDetailsModalComponent } from './show-program-details-modal/show-program-details-modal.component';
import { MyProgramsComponent } from './my-programs/my-programs.component';
import { ShowProgramsMessagesComponent } from './show-programs-messages/show-programs-messages.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login/0' },
  { path: 'login/:id', component: LogInComponent },
  { path : 'registration', component : AccountRegistrationComponent },
  { path: 'home', component: HomePageComponent},
  { path: 'programs', component: ProgramsPageComponent },
  { path: 'categories', component: CategoriesPageComponent, canActivate : [IsLoggedinService]},
  { path: 'account', component: AccountPageComponent, canActivate : [IsLoggedinService]},
  { path: 'messages', component: MessagesPageComponent, canActivate : [IsLoggedinService]},
  { path: 'activitylogs', component: ActivityLogPageComponent, canActivate : [IsLoggedinService]},
  { path: 'programs/:id', component: ShowProgramDetailsModalComponent },
  { path: 'myPrograms', component: MyProgramsComponent, canActivate : [IsLoggedinService]},
  { path: 'programs/messages/:id', component:ShowProgramsMessagesComponent, canActivate : [IsLoggedinService]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
