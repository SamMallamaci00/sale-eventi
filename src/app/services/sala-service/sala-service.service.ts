import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SalaEvento } from '../../model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaServiceService {

  private url = "http://localhost:8080";

  sale : SalaEvento [] = [];
  


  constructor(private http : HttpClient, private router : Router) { }


  saveSala(salaEvento: SalaEvento): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    // Invia l'oggetto salaEvento come body della richiesta
    return this.http.post<string>(`${this.url}/addSala`, salaEvento, {headers, responseType: 'text' as 'json',});
  }
  

  getSale (): Observable<SalaEvento[]>{
    return this.http.get<SalaEvento[]>(`${this.url}/getSale`);

  }

  setSale (){
    this.getSale().subscribe(
      result => {
        this.sale = result
      }
    )
  }

  verificaDisp(idSala : number, data : Date) : Observable<boolean>{

    return this.http.get<boolean>(`${this.url}/verificaDisp?sala=${idSala}&data=${data}` , { withCredentials: true });
  }
}

