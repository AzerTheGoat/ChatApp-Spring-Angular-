


/*
 Created by zakar on 16/09/2023
*/

import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/Model/Message';
import { UserProfileDTO } from 'src/app/Model/UserProfileDto';
import { MessagesOfConversation } from 'src/app/Services/MessageOfCOnversationService';
import { userOnConversation } from 'src/app/Services/UserOnConversation';
import { CommunicationService } from 'src/app/Services/communicationService';
import {MessageService} from "../../Services/MessageService";

@Component({
  selector: 'app-Conversation', // Le sélecteur HTML pour ce composant
  templateUrl: './Conversation.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./Conversation.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class ConversationComponent implements OnInit{
  @Input() username! : string;
  messages: Message[] = [];
  username$: Observable<string>
  userProfileDTO!: UserProfileDTO;

  constructor(
    private messagesOfConversation: MessagesOfConversation,
    private communicationService: CommunicationService,
    private userOnConversationService: userOnConversation,
    private messageService: MessageService
  ) {
    this.username$ = this.userOnConversationService.username$;
  }
  ngOnInit() {
    this.communicationService.messageSent$.subscribe(() => {
      this.loadMessages(); // Chargez les messages immédiatement après le clic

      // Utilisez setTimeout pour retarder le chargement initial des messages
      setTimeout(() => {
        this.loadMessages(); // Chargez à nouveau les messages après un court délai
      }, 100);
    });

    // Chargez les messages au chargement initial avec un léger délai
    setTimeout(() => {
      this.loadMessages();
    }, 100);


    // Abonnez-vous au service de communication pour mettre à jour la liste de messages
    this.messageService.messageSent$.subscribe((message) => {
      // Assurez-vous que le message est destiné au username actuel
      console.log("ha ana : " + this.username + "ha lfrom : " + message.from + "ha lto : " + message.to);
      if (message.from === this.username+"@goat" || message.to === this.username+"@goat") {
        console.log("tanduz hna btw");
        // Ajoutez le message à la liste
        this.messages.push(message);
      }
    });
  }
  loadMessages() {
    this.messagesOfConversation.getAllMessagesOfConversation(this.username).subscribe((messages) => {
      this.messages = messages;
    });
  }


}
