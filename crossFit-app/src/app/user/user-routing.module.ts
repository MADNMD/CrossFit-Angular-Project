import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthPrevent } from '../core/guards/auth.prevent';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }