/*
 Created by zakar on 16/09/2023
*/

import {Component, Input} from '@angular/core';
import { Message } from 'src/app/Model/Message';

@Component({
  selector: 'app-MessageRecuComponent', // Le sélecteur HTML pour ce composant
  templateUrl: './MessageRecuComponent.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./MessageRecuComponent.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class MessageRecuComponentComponent {
  @Input() message! : Message;
  reactionDisplayOn : boolean = false;

  buttonReaction () {
    this.reactionDisplayOn = !this.reactionDisplayOn;
  }
}
