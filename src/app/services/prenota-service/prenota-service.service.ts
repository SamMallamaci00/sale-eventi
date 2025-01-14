import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Prenotazione } from '../../model/model';

@Injectable({
  providedIn: 'root'
})
export class PrenotaServiceService {
  
  private url = "http://localhost:8080";

  
  constructor(private http : HttpClient, private router : Router) { }

  prenotaSala(idSala : number, cliente : string, data : Date) : Observable<String> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    

    let params = new HttpParams()
    .set('sala', idSala.toString())
    .set('cliente', cliente)
    .set('data', data.toString());

  // Chiamata HTTP POST
  return this.http.post<string>(`${this.url}/prenotaSala`, null, { headers, params, responseType: 'text' as 'json' });
  }

  getPrenotazioniCliente(cliente : string) : Observable <Prenotazione []>{
        return this.http.get<Prenotazione[]>(`${this.url}/getPrenCliente?cliente=${cliente}`);
  }

  getAllPrenotazioni() : Observable <Prenotazione []>{
    return this.http.get<Prenotazione[]>(`${this.url}/getAllPren`);
}

  updatePren(idPren : number, data : Date){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log("dentro update prenotazione")
    

    let params = new HttpParams()
    .set('prenotazione', idPren.toString())
    .set('data', data.toString());

  // Chiamata HTTP POST
  return this.http.post<string>(`${this.url}/updatePren`, null, { headers, params, responseType: 'text' as 'json' });
  }

  deletePren(idPren : number){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    

    let params = new HttpParams()
    .set('idPren', idPren.toString())

  // Chiamata HTTP POST
  return this.http.post<string>(`${this.url}/deletePren`, null, { headers, params, responseType: 'text' as 'json' });
  }
  
}
