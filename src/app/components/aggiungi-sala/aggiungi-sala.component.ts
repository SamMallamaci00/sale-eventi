import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { SalaServiceService } from '../../services/sala-service/sala-service.service';

@Component({
  selector: 'app-aggiungi-sala',
  templateUrl: './aggiungi-sala.component.html',
  styleUrl: './aggiungi-sala.component.css'
})
export class AggiungiSalaComponent {

  
  valid = false
  checked = false



  descrizione  = ""
  prezzo = 0
  nome = ""
  capienza = 0
  id = null
  immagine : any

  constructor(private salaService : SalaServiceService){}



  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        let base64String = e.target.result;
        
        // Rimuovi la parte iniziale "data:image/jpeg;base64,"
        if (base64String.startsWith("data:image/jpeg;base64,")) {
          base64String = base64String.replace("data:image/jpeg;base64,", "");
        }
  
        // Imposta la stringa Base64 pulita come immagine
        this.immagine = base64String;
      };
  
      reader.readAsDataURL(file); // Legge il file come DataURL
    }
}

  saveSala(){

    
  const salaEvento =
  { "descrizione"  : this.descrizione,
    "prezzo": this.prezzo,
    "nome" : this.nome,
    "capienza" : this.capienza,
    "id" : -1,
    "immagine" : this.immagine
  }
  
  console.log("dentro salva")
  this.salaService.saveSala(salaEvento).subscribe(
    result =>{
      console.log("Aggiunta avvenuta con successo")
    }
  )
    
  }
}
