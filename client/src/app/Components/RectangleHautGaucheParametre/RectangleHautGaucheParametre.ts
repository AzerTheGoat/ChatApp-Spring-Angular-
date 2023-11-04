/*
 Created by zakar on 26/09/2023
*/

import {Component} from '@angular/core';
import {ParametreService} from "../../ParametreService";

@Component({
  selector: 'app-RectangleHautGaucheParametre', // Le sélecteur HTML pour ce composant
  templateUrl: './RectangleHautGaucheParametre.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./RectangleHautGaucheParametre.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class RectangleHautGaucheParametreComponent {
  constructor(private parametreService: ParametreService) {} // Injection du service
  toggleParametre() {
    // Appelez la méthode du service pour inverser la valeur de la variable booléenne
    this.parametreService.toggleParametre();
  }
}
