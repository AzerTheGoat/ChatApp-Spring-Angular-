/*
 Created by zakar on 16/09/2023
*/

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ConversationHistoriqueComponent', // Le sélecteur HTML pour ce composant
  templateUrl: './ConversationHistoriqueComponent.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./ConversationHistoriqueComponent.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class ConversationHistoriqueComponentComponent {
  @Input() username!: string;
  //@Input() pp!: string;
  //@Input() time!: bigint;
  @Input() dernierMessage!: string;
  @Input() isRead!: boolean;
}
