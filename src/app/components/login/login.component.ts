import { Component, EventEmitter, Output } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { Cliente } from '../../model/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mostraErrore: boolean = false;
  erroreMessaggio: string = "";
  usernameError: boolean = false;


  constructor(private authService : AuthServiceService){}

  email = ""
  password = ""
  isRegisterMode = false; // Modalità login iniziale


  username=""
  permessi=""
  confirmPassword=""

  mostraSuccesso = false
  

  @Output() close = new EventEmitter<void>();


  login(e : Event){
    this.authService.login(this.email, this.password)
    this.close.emit(); // Chiude il modal al termine

  }

  toggleMode() {
    this.mostraSuccesso = false
    this.isRegisterMode = !this.isRegisterMode;
  }


  emailError = false;
passwordMismatchError = false;

registazione(e :Event) {
  e.preventDefault();


  console.log("chiama registrazione")
  this.mostraErrore = false;
  this.mostraSuccesso = false; // Nascondi la schermata di successo in caso di errore

  // Reset degli errori
  this.emailError = false;
  this.passwordMismatchError = false;
  this.usernameError= false

  // Controllo validità email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    this.emailError = true;
  }

  // Controllo che la password e la conferma della password coincidano
  if (this.password !== this.confirmPassword) {
    this.passwordMismatchError = true;
  
  }

  if(this.username == ""){
    this.usernameError= true
  }

if(!this.usernameError && !this.emailError && !this.passwordMismatchError!){
  this.authService.registrazione(this.email, this.password, this.username).subscribe(
    (rec) => {
      this.mostraSuccesso = true;
      console.log("registrazione completata")
       

    },
    (error) => {
      console.error("Errore durante la registrazione:", error);
  
      // Controlla lo status e il messaggio dell'errore
      if (error.status === 409) {
        if (error.error === "Esiste già un utente che utilizza l'email selezionata.") {
          console.log("Errore: Email già in uso");
          this.mostraErrore = true;
          this.erroreMessaggio = "La email inserita è già utilizzata.";
        } else if (error.error === "Esiste già un utente con l'username inserito.") {
          console.log("Errore: Username già in uso");
          this.mostraErrore = true;
          this.erroreMessaggio = "Lo username inserito è già utilizzato.";
        }
      } else {
        // Errore generico
        console.log("Errore generico");
        this.mostraErrore = true;
        this.erroreMessaggio = "Si è verificato un errore durante la registrazione.";
      }
    }
  );}
  
  }


}
