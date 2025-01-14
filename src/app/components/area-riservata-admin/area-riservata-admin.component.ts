import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-riservata-admin',

  templateUrl: './area-riservata-admin.component.html',
  styleUrl: './area-riservata-admin.component.css'
})
export class AreaRiservataAdminComponent {

  constructor(private router : Router){}

  prenotazioni(){
    this.router.navigate(['area-riservata-admin/prenotazioni-admin',])

  }

  clienti(){}
  
  aggiungiCliente(){
    this.router.navigate(['area-riservata-admin/aggiungi-cliente',])

  }

  aggiungiSala(){
    this.router.navigate(['area-riservata-admin/aggiungi-sala',])

  }

}
