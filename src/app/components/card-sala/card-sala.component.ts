import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-sala',
  templateUrl: './card-sala.component.html',
  styleUrl: './card-sala.component.css'
})
export class CardSalaComponent {

  @Input() data : any

}
