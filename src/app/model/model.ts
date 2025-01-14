
export interface AuthToken{
    token:string
} 

export interface ClienteLogin{
    email:string
    password : string
}


export interface Cliente{
    username :string
    email:string
    password : string
    id : number 
    permessi : string

}

export interface Prenotazione{

    id: number
    data: Date
    costo: number
    sala : SalaEvento
    cliente: Cliente

}

export interface SalaEvento{
    id : number
    capienza : number
    prezzo : number
    nome : string
    immagine : string
    descrizione : string
    
    
}
