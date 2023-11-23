import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { SessionService } from '../services/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword = false;
  usuario: string = '';
  password: string = '';

  constructor(private dataService: DataService, private router: Router, private sessionService: SessionService) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.usuario && this.password) {
      this.dataService.autenticar(this.usuario, this.password).subscribe(
        (response) => {
          if (response.success) {
            alert('Inicio de sesión exitoso');
            // Llama al método login del servicio de sesión
            this.sessionService.login();
            // Redirige al usuario a otra página después de un inicio de sesión exitoso
            this.router.navigate(['/p/registro-general']);
          } else {
            alert('Usuario o contraseña incorrectos.');
          }
        },
        (error) => {
          console.error('Error en la autenticación:', error);
          alert('Error en la autenticación. Consulta la consola para más detalles.');
        }
      );
    } else {
      alert('Rellene todos los campos por favor.');
    }
  }

}
