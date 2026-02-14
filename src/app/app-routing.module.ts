import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './utils/auth.guard';

const routes: Routes = [
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:'homepage',
    component:HomePageComponent,
    canActivate:[authGuard],
    children:[
      
    ]
  },
  {
    path:'',
    redirectTo:'/homepage',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
