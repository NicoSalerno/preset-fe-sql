import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './utils/auth.interceptor';
import { logoutInterceptor } from './utils/logout.interceptor';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DefaultCardComponent } from './components/default-card/default-card.component';
import { ModalDefaultComponent } from './components/modals/modal-default/modal-default.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomePageComponent,
    NavUserComponent,
    NavBarComponent,
    DefaultCardComponent,
    ModalDefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, logoutInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
