import { Component, Input, ViewChild } from '@angular/core';
import { sendMessage } from 'src/app/Services/SendMessage';
import { MessagesOfConversation } from 'src/app/Services/MessageOfCOnversationService';
import { CommunicationService } from 'src/app/Services/communicationService';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-MessageInput',
  templateUrl: './MessageInput.component.html',
  styleUrls: ['./MessageInput.component.css']
})
export class MessageInputComponent {
  @Input() username!: string;
  messageText: string = ''; // Liaison de modèle pour l'entrée

  @ViewChild('messageForm') messageForm!: NgForm; // Reference to the form

  constructor(private message: sendMessage, private TousMessages: MessagesOfConversation, private communicationService: CommunicationService) {}

  sendMessage() {
    this.communicationService.messageSent$.subscribe(() => {
      // Mettez à jour les données lorsque le bouton est cliqué
    });

    if (this.messageForm.valid) { // Check if the form is valid
      if (this.messageText) { // Vérifiez si le messageText n'est pas vide
        this.message.sendMessage(this.username, '', this.messageText).subscribe(
          (response) => {
            console.log('Message envoyé avec succès', response);
            this.messageText = ''; // Réinitialisez le champ de texte après l'envoi
            //this.communicationService.sendMessageSent();
          },
          (error) => {
            console.error("Erreur lors de l'envoi du message", error);
          }
        );
      }
    }
  }
}
