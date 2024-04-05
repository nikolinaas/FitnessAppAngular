import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LogInComponent },
  { path : 'registration', component : AccountRegistrationComponent },
  { path: 'home', component: HomePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
