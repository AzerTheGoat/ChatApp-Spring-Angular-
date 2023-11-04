/*
 Created by zakar on 17/09/2023
*/

import {Component, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-BMessageEnvoye', // Le sélecteur HTML pour ce composant
  templateUrl: './BMessageEnvoye.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./BMessageEnvoye.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class BMessageEnvoyeComponent {
  reactionDisplayOn : boolean = false;

  constructor(private elRef: ElementRef) {}
  buttonReaction () {
    this.reactionDisplayOn = !this.reactionDisplayOn;
    console.log("izuzvhoi");
  }

}
