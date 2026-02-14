import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent{
  protected authSrv = inject(AuthService);
  user$ = this.authSrv.currentUser$;


}
