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
  selector: 'app-Bconversation', // Le sélecteur HTML pour ce composant
  templateUrl: './Bconversation.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./Bconversation.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class BconversationComponent implements OnInit{
  @Input() username! : string;
  messages: Message[] = [];
  username$: Observable<string>
  userProfileDTO!: UserProfileDTO;

  constructor(private messageOfConversation: MessagesOfConversation, private communicationService: CommunicationService,private userOnConversationService : userOnConversation,  private messageService: MessageService ) {
    this.username$ = this.userOnConversationService.username$;
  }

  ngOnInit() {
    this.username$.subscribe(username => {
      this.username = username;
      console.log(username);
    })
    this.userProfileDTO = new UserProfileDTO(this.username);

    this.communicationService.messageSent$.subscribe(() => {
      // Appelez la méthode du service pour obtenir les messages à chaque envoi de message
      this.messageOfConversation.getAllMessagesOfConversation(this.username).subscribe((messages) => {
        this.messages = messages;
      });
    });

    // Appelez la méthode du service pour obtenir les messages au chargement initial
    this.messageOfConversation.getAllMessagesOfConversation(this.username).subscribe((messages) => {
      this.messages = messages;
    });

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

}
