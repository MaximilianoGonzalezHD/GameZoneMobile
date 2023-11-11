import { Component } from '@angular/core';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { DbservicioService } from './services/dbservicio.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userRole: string | null;
  userId: string | null;
  constructor(public loadingService: LoadingService, public router: Router, private bd: DbservicioService) {
    this.userRole = localStorage.getItem('userRole');
    this.userId = localStorage.getItem('userId');
  }

  hasUserRole(role: string): boolean {
    const storedRole = localStorage.getItem('userRole');
    return storedRole === role;
  }
  irVideojuegos() {
    this.router.navigate(['/lista-videojuegos'])
  }
  irUsuarios() {
    this.router.navigate(['/lista-usuario'])
  }
  logout() {
    localStorage.setItem('userRole', 'null');
    localStorage.removeItem('userId');
    this.router.navigate(['/home']);
    this.bd.presentAlert('Se ha cerrado sesión');
  
    
  }

}
