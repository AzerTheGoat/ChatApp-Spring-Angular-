/*
 Created by zakar on 16/09/2023
*/

import {Component, Input} from '@angular/core';
import { Message } from 'src/app/Model/Message';

@Component({
  selector: 'app-MessageEnvoyeComponent', // Le sélecteur HTML pour ce composant
  templateUrl: './MessageEnvoyeComponent.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./MessageEnvoyeComponent.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class MessageEnvoyeComponentComponent {
  reactionDisplayOn : boolean = false;
  @Input() message!: Message;

  buttonReaction () {
    this.reactionDisplayOn = !this.reactionDisplayOn;
  }
}
