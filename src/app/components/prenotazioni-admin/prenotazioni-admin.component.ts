import { Component } from '@angular/core';
import { Prenotazione } from '../../model/model';
import { PrenotaServiceService } from '../../services/prenota-service/prenota-service.service';
import { SalaServiceService } from '../../services/sala-service/sala-service.service';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prenotazioni-admin',
  templateUrl: './prenotazioni-admin.component.html',
  styleUrl: './prenotazioni-admin.component.css'
})
export class PrenotazioniAdminComponent {

  prenotazioni : Prenotazione [] = []
  prenotazioniRicerca : Prenotazione [] = []
  prenotazioniFiltri : Prenotazione [] = []

  page: number = 1; // Ppagina iniziale
  itemsPerPage: number = 5; // Numero di prenotazioni per pagina

  selectedPren: any = null; // Sala selezionata per il modale
  showModal: boolean = false; // Variabile per controllare la visibilità del modale
  showModifica = false


  clicked = false

  
  disponibile = false

  sala : number | any
  cliente = ""
  data : Date | any
  isDatanull: boolean = false;
  mostraSuccesso: boolean = false ;
  mostraErrore: boolean = false;
  erroreMessaggio: string = "";
  eliminato: boolean = false;



  

  constructor(private prenServ : PrenotaServiceService, private authServ : AuthServiceService, private saleServ : SalaServiceService,
              private router : Router, private route : ActivatedRoute
  ){}


  ngOnInit(): void {
    this.prenServ.getAllPrenotazioni().subscribe(
      result => {

        this.prenotazioniRicerca = result
        this.route.queryParamMap.subscribe(params => {
          

          
          this.cliente = params.get('cliente') || "";
          this.data = params.get('data') || null;
          this.sala = params.get('sala') || null;
          // Ricarica i dati quando i parametri cambiano
          this.caricaDati();
        });
      }
    )
  }

  

  openModal(prenotazione: any) {
    this.selectedPren = prenotazione;
    this.showModal = true; // Mostra il modale
    console.log("openModal " + this.showModal)
  }



  // Metodo per chiudere il modale
  closeModal() {
    this.showModal = false; // Nascondi il contenuto del modale legato a Angular
    const modalBackdrop = document.querySelector('.modal-backdrop'); // Seleziona l'overlay del modale
    if (modalBackdrop) {
      modalBackdrop.remove(); // Rimuovi l'overlay
    }
    document.body.classList.remove('modal-open'); // Rimuovi la classe che impedisce lo scrolling
    document.body.style.removeProperty('overflow'); // Rimuovi proprietà aggiunte da Bootstrap
    document.body.style.removeProperty('padding-right'); // Rimuovi padding aggiuntivo
  }


  openModifica() {
    this.showModifica = true
  }


  verificaDisp(idSala : number){
    this.saleServ.verificaDisp(idSala, this.data).subscribe(
      result => {
        this.disponibile = result
      }
    )
  }

  modificaPren(idPren: number) {
    if (this.data == "" || this.data == null) {
      this.isDatanull = true;
      return; // Esci dal metodo se i dati sono nulli o vuoti
    }
  
    this.prenServ.updatePren(idPren, this.data).subscribe(
      (result) => {
        // Modifica riuscita, mostra messaggio di successo
        this.mostraSuccesso = true; // Mostra il messaggio di successo
        this.mostraErrore = false; // Nasconde eventuali errori precedenti
        this.isDatanull = false;
  
        this.prenServ.getAllPrenotazioni().subscribe(
          (result) => {
            this.prenotazioniRicerca = result; // Aggiorna le prenotazioni ricercate
            this.caricaDati(); // Ricarica la tabella con i nuovi dati
          },(error) => {
            console.error("Errore durante il recupero delle prenotazioni aggiornate:", error);
          }
        );
       
        // Chiudi il modale dopo 3 secondi
        setTimeout(() => {
          this.mostraSuccesso = false; // Nascondi il messaggio dopo 3 secondi
          this.closeModal(); // Chiudi il modale
        }, 3000);
      },
      (error) => {
        console.error("Errore durante la modifica:", error);
  
        if (error.status === 409) { 
          // Messaggio specifico per sala non disponibile
          this.mostraErrore = true;
          this.isDatanull = false;
          this.erroreMessaggio = "La sala non è disponibile per la data inserita.";
        } else {
          // Errore generico
          this.erroreMessaggio = "Si è verificato un errore durante la modifica.";
        }
      }
    );

     // Aggiorna la tabella
     this.caricaDati();
  
  }
  

  elimina(idPren: number) {
    this.prenServ.deletePren(idPren).subscribe(
      result => {
        this.prenotazioni = this.prenotazioni?.filter(prenotazione => prenotazione.id !== idPren);
        this.prenServ.getAllPrenotazioni().subscribe(
          (result) => {
            this.prenotazioniRicerca = result;
            this.caricaDati();
  
            this.showModal = false
            // Chiudi il modal principale prima di mostrare la conferma
  
            // Mostra il modal di conferma
            setTimeout(() => {
              this.eliminato = true;
            }, 0);
          },
          (error) => {
            console.error("Errore durante il recupero delle prenotazioni aggiornate:", error);
          }
        );
      },
      (error) => {
        console.error("Errore durante l'eliminazione della prenotazione:", error);
      }
    );
  }
  

  chiudiModal() {
    this.eliminato = false; // Nasconde il modal di conferma
    
    // Rimuovi il backdrop dal DOM
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  
    // Rimuovi la classe che impedisce lo scrolling
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right'); // Rimuovi padding aggiuntivo
  }
  
  



  caricaDati(){

    this.eliminato = false
    const sala = this.route.snapshot.queryParamMap.get('sala') || "";
    const data = this.route.snapshot.queryParamMap.get('data')|| "";
    const cliente = this.route.snapshot.queryParamMap.get('cliente')|| "";

    console.log("DENTRO CARICA DATIcliente: " + cliente + " sala: " + sala + " data: " + data
    )


    
  
  if(this.prenotazioniRicerca){
  
    
  
    let filtroAttivo = 0;

    if (sala != null && sala.trim() !== "") filtroAttivo += 1;
if (cliente != null && cliente.trim() !== "") filtroAttivo += 2;
if (data != null && data.trim() !== "") filtroAttivo += 4;

switch (filtroAttivo) {
  case 0:
    // Nessun filtro applicato
    console.log("Nessun filtro applicato, eseguo la ricerca globale.");
    this.prenotazioni = this.prenotazioniRicerca;
    break;
  case 1:
    // Solo sala
    console.log("Filtro per sala applicato.");
    this.prenotazioni = this.prenotazioniRicerca.filter(p =>
      p.sala.nome.toLowerCase().replace(/\s+/g, "").includes(
        this.sala.toLowerCase().replace(/\s+/g, "").trim()
      )
    );
    break;
  case 2:
    // Solo cliente
    console.log("Filtro per cliente applicato.");
    this.prenotazioni = this.prenotazioniRicerca.filter(p =>
      p.cliente.username.toLowerCase().replace(/\s+/g, "").includes(
        this.cliente.toLowerCase().replace(/\s+/g, "").trim()
      )
    );
    break;
  case 3:
    // Sala e cliente
    console.log("Filtro per sala e cliente applicati.");
    this.prenotazioni = this.prenotazioniRicerca.filter(p =>
      p.sala.nome.toLowerCase().replace(/\s+/g, "").includes(
        this.sala.toLowerCase().replace(/\s+/g, "").trim()
      ) &&
      p.cliente.username.toLowerCase().replace(/\s+/g, "").includes(
        this.cliente.toLowerCase().replace(/\s+/g, "").trim()
      )
    );
    break;
  case 4:
    // Solo data
    console.log("Filtro per data applicato.");
    this.prenotazioni = this.prenotazioniRicerca.filter(p =>
      p.data === this.data
    );
    break;
  case 5:
    // Sala e data
    console.log("Filtro per sala e data applicati.");
    this.prenotazioni = this.prenotazioniRicerca.filter(p =>
      p.sala.nome.toLowerCase().replace(/\s+/g, "").includes(
        this.sala.toLowerCase().replace(/\s+/g, "").trim()
      ) &&
      p.data === this.data
    );
    break;
  case 6:
    // Cliente e data
    console.log("Filtro per cliente e data applicati.");
    this.prenotazioni = this.prenotazioniRicerca.filter(p =>
      p.cliente.username.toLowerCase().replace(/\s+/g, "").includes(
        this.cliente.toLowerCase().replace(/\s+/g, "").trim()
      ) &&
      p.data === this.data
    );
    break;
  case 7:
    // Sala, cliente e data
    console.log("Filtro per sala, cliente e data applicati.");
    this.prenotazioni = this.prenotazioniRicerca.filter(p =>
      p.sala.nome.toLowerCase().replace(/\s+/g, "").includes(
        this.sala.toLowerCase().replace(/\s+/g, "").trim()
      ) &&
      p.cliente.username.toLowerCase().replace(/\s+/g, "").includes(
        this.cliente.toLowerCase().replace(/\s+/g, "").trim()
      ) &&
      p.data === this.data
    );
    break;
  default:
    console.log("Filtro non riconosciuto.");
    this.prenotazioni = this.prenotazioniRicerca;
}

  }else{
    console.log("dentro else")
  }


  }

  applica() {
    console.log("cliente: " + this.cliente + " sala: " + this.sala + " data: " + this.data);
  
    this.router.navigate([], {
      relativeTo: this.route, // Mantieni la stessa route
      queryParams: {
        cliente: this.cliente || null,
        sala: this.sala || null,
        data: this.data || null
      },
      queryParamsHandling: 'merge' // Aggiorna i parametri mantenendo quelli esistenti
    });
  }
  
  onDateChange() {
    
      this.disponibile = false
      this.isDatanull = false
      this.mostraErrore = false
    
  }
  
  formatDescription(description: string): string {
  
    
      return description
        .split('\n') // Divide il testo in base ai ritorni a capo
        .map(line => line.trim()) // Rimuove eventuali spazi superflui per ogni riga
        .filter(line => line) // Rimuove eventuali righe vuote
        .join('<br>'); // Riunisce le righe con <br> come separatore
    }
}

