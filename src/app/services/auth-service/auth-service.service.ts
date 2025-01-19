import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthToken, Cliente, ClienteLogin } from '../../model/model';
import { copyFileSync } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = "http://localhost:8080";
  public token?: string | null;

  email=""
  permessi=""

  cliente : Cliente = {
    "email" : "",
    "password" :"",
    "username" : "",
    "id" : 0,
    "permessi" : ""


  }



  getToken(){
    if(typeof localStorage !== 'undefined' && this.token === undefined){
      this.token = localStorage.getItem("bb_token");
    }
    return this.token;
  }
  

  setToken(token : string){
    this.token = token;
    localStorage.setItem("bb_token", token);
  }


  removeToken(){
    this.token = undefined;
    localStorage.removeItem("bb_token");
  }

  constructor(private http : HttpClient, private router : Router) { }


  isAuthenticated(){
    return this.getToken() != undefined;
    
  }


  login(email : string, password : string){
    this.email = email
    console.log(this.email)
    var cliente : ClienteLogin = {
      "email": email, "password": password,
      
    };
    this.http.post<AuthToken>(this.url + "/login", cliente, { withCredentials: true })
  .pipe(
    catchError(error => {
      console.error("Errore durante il login:", error); // Log dell'errore
      alert("Errore durante il login. Per favore riprova."); // Mostra un messaggio all'utente
      return throwError(() => error); // Rilancia l'errore per ulteriori gestioni, se necessario
    })
  )
  .subscribe({
    next: (response) => {
      this.setToken(response.token);
      console.log("Token 1: " + response.token);
      console.log("Login effettuato");
    },
    error: (err) => {
      console.error("Errore gestito nel subscribe:", err); // Se vuoi fare ulteriori azioni in caso di errore
    }
  });
    
    }


    logout(){
      this.http.post<AuthToken>(this.url+"/logout",
        {"autorization" : "Basic " + this.token},{withCredentials:true}).subscribe(
          res => {
            if(res){
              this.removeToken();
              this.router.navigate(['']);
            }
          }
        )
    }


    registrazione(email: string, password: string, username: string): Observable<String> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
    
      let params = new HttpParams()
      .set('email', email)
      .set('username', username)
      .set('password', password);
  
    // Chiamata HTTP POST
    return this.http.post<String>(`${this.url}/registrazione`, null, { headers, params, responseType: 'text' as 'json' });

      
    }

    setCliente(email : string): Observable <Cliente>{
      return this.http.get<Cliente>(`${this.url}/getCliente?email=${email}`, {  withCredentials: true });
    }

    getCliente(email : string) : void {
      this.setCliente(email).subscribe(
        result =>{
          this.cliente.email = result.email;
          this.cliente.id = result.id
          this.cliente.password = result.password
          this.cliente.permessi = result.permessi
          console.log("dentro subscribe, permessi: " + result.permessi)
          this.cliente.username = result.username
        }
      )
      console.log("Dentro service, permessi: " + this.cliente.permessi)
    }

    getPermessi(email : string): Observable <string>{
      return this.http.get(`${this.url}/getPermessi?email=${email}`, {responseType: 'text',  withCredentials: true });
    }
    



}