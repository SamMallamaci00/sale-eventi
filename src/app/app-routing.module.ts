import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaRiservataAdminComponent } from './components/area-riservata-admin/area-riservata-admin.component';
import { AreaRiservataClienteComponent } from './components/area-riservata-cliente/area-riservata-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { PrenotazioniClienteComponent } from './components/prenotazioni-cliente/prenotazioni-cliente.component';
import { PrenotazioniAdminComponent } from './components/prenotazioni-admin/prenotazioni-admin.component';
import { AggiungiSalaComponent } from './components/aggiungi-sala/aggiungi-sala.component';
import { AggiungiClienteComponent } from './aggiungi-cliente/aggiungi-cliente.component';

const routes: Routes = [
  {path : "" , component : HomeComponent,
    children: [
      {path: "prenotazioni-admin/:prezzo?/:capienza?/", component: HomeComponent },
    

    ]
  }, 
  
  {path : "area-riservata-cliente" , component : AreaRiservataClienteComponent,
  children: [
    {path: ":sala?/:data?" , component : AreaRiservataAdminComponent},
  ],},



  {path: "area-riservata-admin", component: AreaRiservataAdminComponent,
    children: [
      {path: "prenotazioni-admin" , component : PrenotazioniAdminComponent},
      { path: "prenotazioni-admin/:cliente?/:sala?/:data?", component: PrenotazioniAdminComponent },
      {path: "aggiungi-sala" , component : AggiungiSalaComponent},
      {path: "aggiungi-cliente" , component : AggiungiClienteComponent},


    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
