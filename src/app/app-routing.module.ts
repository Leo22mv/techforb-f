import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginFormComponent } from './components/pages/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/pages/login/register-form/register-form.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "auth", component: LoginComponent, children: [
    {path: "login", component: LoginFormComponent},
    {path: "register", component: RegisterFormComponent}
  ]},
  {path: "", redirectTo: "/auth/login", pathMatch: "full"},
  {path: "**", redirectTo: "/auth/login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
