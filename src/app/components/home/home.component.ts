import { Component, OnInit } from '@angular/core';
import { Cliente, SalaEvento } from '../../model/model';
import { SalaServiceService } from '../../services/sala-service/sala-service.service';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { PrenotaServiceService } from '../../services/prenota-service/prenota-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  mostraSuccesso: boolean = false;
  mostraErrore: boolean = false;
  erroreMessaggio: string = "";

  constructor(private saleServ : SalaServiceService, private authServ : AuthServiceService, private prenServ : PrenotaServiceService,
              private router : Router, private route : ActivatedRoute
  ){ }
  

  model: any; // Modello per la data selezionata

  data: Date | any

  page = 1; // Pagina iniziale
  itemsPerPage = 6; // Numero di elementi per pagina

  cliente : Cliente = {
    "email" : "",
    "password" :"",
    "username" : "",
    "id" : 0,
    "permessi" : ""


  }

 

  sale : SalaEvento[] =  [];
  saleRicerca : SalaEvento[] =  []
  saleFiltri : SalaEvento[] =  []
 

  selectedSala: any = null; // Sala selezionata per il modale
  showModal: boolean = false; // Variabile per controllare la visibilità del modale

  showVerifica : boolean = false

  clicked = false

  checked = false

  disponibile = false

  isDatanull = false;


  prezzo = 0 

  capienza = 0 

  ngOnInit(): void {
    this.saleServ.setSale()
    this.sale = this.saleServ.sale

    this.saleServ.getSale().subscribe(
      result => {
        this.saleRicerca = result
        this.route.queryParamMap.subscribe(params => {
          let prezzoParam = params.get('prezzo');
        let capienzaParam = params.get('capienza');
      
      // Imposta valori predefiniti se i parametri non sono numerici o non esistono
        this.prezzo = prezzoParam ? parseInt(prezzoParam) : 0;
        this.capienza = capienzaParam ? parseInt(capienzaParam) : 0;
          // Ricarica i dati quando i parametri cambiano
          this.caricaDati();
      }
    )
    
    })
}

caricaDati(){
  const prezzo = this.route.snapshot.queryParamMap.get('prezzo') || "";
  const capienza = this.route.snapshot.queryParamMap.get('capienza')|| "";

  console.log("DENTRO CARICA DATI" + " prezzo: " + prezzo + " capienza: " + capienza
  )


  

if(this.saleRicerca){

  

  let filtroAttivo = 0;

if (prezzo != null && prezzo != "") filtroAttivo += 1;
if (capienza != null && capienza != "") filtroAttivo += 2;



  switch (filtroAttivo) {
  case 0:
    // Nessun filtro applicato
    console.log("Nessun filtro applicato, eseguo la ricerca globale.");
    this.sale = this.saleRicerca;
    break;
  case 1:
    // Solo sala
    console.log("Filtro per prezzo applicato.");
    this.sale = this.saleRicerca.filter(p => p.prezzo <= this.prezzo);
    break;
  case 2:
    // Solo data
    console.log("Filtro per capienza applicato.");
    this.sale = this.saleRicerca.filter(p => p.capienza >= this.capienza);
    break;
  case 3:
    // Sala e data
    console.log("Filtro per prezzo e capienza applicati.");
    this.sale = this.saleRicerca.filter(p => p.prezzo <= this.prezzo && p.capienza >= this.capienza);
    break;
  default:
    console.log("Filtro non riconosciuto.");
    this.sale = this.saleRicerca;
  }

}else{
  console.log("dentro else")
}


}


applica() {
  console.log(" prezzo: " + this.prezzo + " capienza: " + this.capienza);

  this.router.navigate([], {
    relativeTo: this.route, // Mantieni la stessa route
    queryParams: {
      prezzo: this.prezzo || null,
      capienza: this.capienza || null
    },
    queryParamsHandling: 'merge' // Aggiorna i parametri mantenendo quelli esistenti
  });
}



  openModal(sala: any) {
    this.selectedSala = sala;
    this.showModal = true; // Mostra il modale
    console.log("openModal " + this.showModal)
  }

  // Metodo per chiudere il modale
  closeModal() {
    this.showModal = false; // Nasconde il modale
    this.selectedSala = null; // Resetta la sala selezionata
    this.showVerifica = false
    this.clicked = false

    this.checked = false

    this.disponibile = false
    const modalBackdrop = document.querySelector('.modal-backdrop'); // Seleziona l'overlay del modale
    if (modalBackdrop) {
      modalBackdrop.remove(); // Rimuovi l'overlay
    }
    document.body.classList.remove('modal-open'); // Rimuovi la classe che impedisce lo scrolling
    document.body.style.removeProperty('overflow'); // Rimuovi proprietà aggiunte da Bootstrap
    document.body.style.removeProperty('padding-right'); // Rimuovi padding aggiuntivo
  
  }

  openVerifica() {
    this.showVerifica = true
  }

  verificaDisp(idSala : number){
    if (this.data == "" || this.data == null) {
      this.isDatanull = true;
      return; // Esci dal metodo se i dati sono nulli o vuoti
    }else{
    this.saleServ.verificaDisp(idSala, this.data).subscribe(
      result => {
        this.disponibile = result
        this.checked = true
        

      }
    )}
  }

  prenota(idSala : number){
    console.log("Dentro prenota Id cliente: " + this.cliente.id)
    this.prenServ.prenotaSala(idSala, this.authServ.email, this.data).subscribe(
      (result) => {
        // Modifica riuscita, mostra messaggio di successo
        this.mostraSuccesso = true; // Mostra il messaggio di successo
        this.mostraErrore = false; // Nasconde eventuali errori precedenti
        this.checked = false
      
   setTimeout(() => {
      this.mostraSuccesso = false; // Nascondi il messaggio dopo 3 secondi
      this.closeModal(); // Chiudi il modale
    }, 3000)
  },
  
    (error) => {
      console.error("Errore durante la modifica:", error);

      if (error.status === 409) { 
        // Messaggio specifico per sala non disponibile
        this.mostraErrore = true;
        this.erroreMessaggio = "La sala non è più disponibile per la data inserita.";
      } else {
        // Errore generico
        this.erroreMessaggio = "Si è verificato un errore durante la modifica.";
      }
    }
  );

}
  onDateChange() {
    

      this.showVerifica = true;  // Mostra il tasto "Verifica disponibilità"
      this.disponibile = false
      this.checked = false
      this.isDatanull = false
   
    
  }

  isAuthenticated(): boolean{
    return this.authServ.isAuthenticated()
  }

  formatDescription(description: string): string {
  
    return description
      .split('\n') // Divide il testo in base ai ritorni a capo
      .map(line => line.trim()) // Rimuove eventuali spazi superflui per ogni riga
      .filter(line => line) // Rimuove eventuali righe vuote
      .join('<br>'); // Riunisce le righe con <br> come separatore
  }
}
