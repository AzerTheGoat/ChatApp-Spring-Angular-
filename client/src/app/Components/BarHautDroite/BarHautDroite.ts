/*
 Created by zakar on 16/09/2023
*/

import {Component, Input} from '@angular/core';
import {userOnConversation} from "../../Services/UserOnConversation";

@Component({
  selector: 'app-BarHautDroite', // Le sélecteur HTML pour ce composant
  templateUrl: './BarHautDroite.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./BarHautDroite.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class BarHautDroiteComponent {
  @Input() username!: string;
  

}
