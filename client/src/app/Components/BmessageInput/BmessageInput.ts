/*
 Created by zakar on 16/09/2023
*/

import {Component, Input} from '@angular/core';
import { MessagesOfConversation } from 'src/app/Services/MessageOfCOnversationService';
import { sendMessage } from 'src/app/Services/SendMessage';
import { NgModel } from '@angular/forms';
import { CommunicationService } from 'src/app/Services/communicationService';

@Component({
  selector: 'app-BmessageInput', // Le sélecteur HTML pour ce composant
  templateUrl: './BmessageInput.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./BmessageInput.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class BmessageInputComponent {
  @Input() username!: string;
  messageText: string = ''; // Liaison de modèle pour l'entrée

  constructor(private message: sendMessage, private TousMessages: MessagesOfConversation, private communicationService: CommunicationService) {}

  sendMessage() {
    console.log(1);
    if (this.messageText) { // Vérifiez si le messageText n'est pas vide
      this.message.sendMessage(this.username, "" ,this.messageText).subscribe(
        (response) => {
          console.log('Message envoyé avec succès', response);
          this.messageText = ''; // Réinitialisez le champ de texte après l'envoi
          this.communicationService.sendMessageSent();

        },
        (error) => {
          console.error("Erreur lors de l'envoi du message", error);
        }
      );
    }
  }
}
