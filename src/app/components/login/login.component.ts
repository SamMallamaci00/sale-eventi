import { Component, EventEmitter, Output } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { Cliente } from '../../model/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private authService : AuthServiceService){}

  email = ""
  password = ""
  isRegisterMode = false; // Modalità login iniziale


  username=""
  permessi=""
  confirmPassword=""
  

  @Output() close = new EventEmitter<void>();


  login(e : Event){
    this.authService.login(this.email, this.password)
    this.close.emit(); // Chiude il modal al termine

  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }


  emailError = false;
passwordMismatchError = false;

registarti(e: Event) {
  e.preventDefault();

  // Reset degli errori
  this.emailError = false;
  this.passwordMismatchError = false;

  // Controllo validità email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    this.emailError = true;
    return;
  }

  // Controllo che la password e la conferma della password coincidano
  if (this.password !== this.confirmPassword) {
    this.passwordMismatchError = true;
    return;
  }

 /* const nuovoUtente: Cliente = {
    email: this.email,
    password: this.password, 
    username: this.username,
    permessi: "cliente"
  };

  this.authService.registrazione(this.email, this.password, this.nome, this.cognome, "cliente").subscribe(
    rec => {
      if (rec) {
        console.log(rec);
      } else {
        console.log("Registrazione non riuscita");
      }
    }
  );*/
}

}
