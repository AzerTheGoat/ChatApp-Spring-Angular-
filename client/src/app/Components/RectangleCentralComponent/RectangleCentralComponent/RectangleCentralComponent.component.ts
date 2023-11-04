/*
 Created by goat on 9/15/23
*/

import {Component} from '@angular/core';

@Component({
  selector: 'app-RectangleCentralComponent', // Le sélecteur HTML pour ce composant
  templateUrl: './RectangleCentralComponent.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./RectangleCentralComponent.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class RectangleCentralComponentComponent {
  afficherRectangleADroite: boolean = false; // Déclaration de la variable ici

  afficherRectangle() {
    this.afficherRectangleADroite = true;
  }


}
