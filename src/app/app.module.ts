import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AreaRiservataClienteComponent } from './components/area-riservata-cliente/area-riservata-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { AreaRiservataAdminComponent } from './components/area-riservata-admin/area-riservata-admin.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrenotazioniAdminComponent } from './components/prenotazioni-admin/prenotazioni-admin.component';
import { PrenotazioniClienteComponent } from './components/prenotazioni-cliente/prenotazioni-cliente.component';
import { CardSalaComponent } from './components/card-sala/card-sala.component';
import { AggiungiSalaComponent } from './components/aggiungi-sala/aggiungi-sala.component';
import { FormsModule } from '@angular/forms';
import { AggiungiClienteComponent } from './aggiungi-cliente/aggiungi-cliente.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AreaRiservataClienteComponent,
    AreaRiservataAdminComponent,
    ClientiComponent,
    HomeComponent,
    PrenotazioniAdminComponent,
    PrenotazioniClienteComponent,
    CardSalaComponent,
    AggiungiSalaComponent,
    AggiungiClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    HttpClientModule
    

    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
