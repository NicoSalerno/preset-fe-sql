import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  protected authSrv = inject(AuthService);
  protected router = inject(Router)

  user$ = this.authSrv.currentUser$;

  routeHome(){
    this.router.navigate(['homepage']);
  }

  routeCharts(){
    this.router.navigate(['homepage/charts']);
  }

  routeExample(){
    this.router.navigate(['/example']);
  }


  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login'])
  }
}
