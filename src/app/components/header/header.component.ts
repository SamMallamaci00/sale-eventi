import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { Cliente } from '../../model/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor( private authService : AuthServiceService, private router:Router){}

  email = ""
  password = ""
 
  permessi = ""
  isMenuOpen = false;

  isModalOpen = false;

  setPermessi(){
    this.authService.getCliente(this.authService.email)
    this.permessi = this.authService.cliente.permessi

  }

  areaRiservata() {
    this.isMenuOpen = !this.isMenuOpen;
    this.authService.getPermessi(this.authService.email).subscribe(
      (rec: string) => {
        switch (rec) {
          case 'cliente':
            this.router.navigate(['area-riservata-cliente']);
            break;
          case 'admin':
            this.router.navigate(['area-riservata-admin/prenotazioni-admin']);
            break;
          
          default:
            console.error('Ruolo non riconosciuto:', rec);
        }
      },
      error => {
        
        console.error('Errore durante il recupero del ruolo:', error);
      }
    );
    this.openModal()
 

     // Chiudi il menu dopo la navigazione
  }


  login(e : Event){
    this.authService.login(this.email, this.password)

  }


  logout(){
    
    this.authService.logout()
    }

  isAuthenticated(): boolean{
    return this.authService.isAuthenticated()
  }

  openModal() {
   console.log("openModal")
    this.isModalOpen = true;
    
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
