import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthPrevent } from '../core/guards/auth.prevent';
import { ProfileComponent } from './profile/profile.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthPrevent]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthPrevent]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthActivate],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }