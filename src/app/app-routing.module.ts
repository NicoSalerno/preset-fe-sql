import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './utils/auth.guard';
import { ChartsPageComponent } from './pages/charts-page/charts-page.component';
import { ExampleComponent } from './pages/example/example.component';

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

    children:[
      {
        path:'charts',
        component:ChartsPageComponent
      }
    ]
  },
  {
    path:'example',
    component:ExampleComponent
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
