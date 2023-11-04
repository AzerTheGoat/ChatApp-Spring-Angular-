/*
 Created by zakar on 16/09/2023
*/

import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConversationDisplayDTO } from 'src/app/Model/ConversationDisplayDTO';
import { GetAllConversationService } from 'src/app/Services/GetAllConversationService';
import { userOnConversation } from 'src/app/Services/UserOnConversation';
import { Observable } from 'rxjs';
import {MessageService} from "../../Services/MessageService";

@Component({
  selector: 'app-BrectangleCentrale', // Le sélecteur HTML pour ce composant
  templateUrl: './BrectangleCentrale.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./BrectangleCentrale.component.css'], // Le chemin vers le fichier CSS du composant (facultatif)
  animations: [
    trigger('slideFromBottom', [
      state('void', style({ transform: 'translateY(100%)' })),
      transition(':enter', animate('300ms ease-out')),
      transition(':leave', animate('300ms ease-in')),
    ]),
  ],
})
export class BrectangleCentraleComponent {
  @Input() username!: string ;
  username$: Observable<string>;
  conversationUpDisplay : boolean = false;

  isConversationExist : boolean = false;

  onclickOvaleUp(){
    this.conversationUpDisplay = !this.conversationUpDisplay;
    this.ngOnInit();
  }

  conversations : ConversationDisplayDTO[] = [];
  constructor(private conversationService : GetAllConversationService, private userOnConversationService : userOnConversation, private messageService : MessageService) {
    this.username$ = this.userOnConversationService.username$;
  }
  ngOnInit() {
    this.conversationService.getAllConversations().subscribe(
      (data: ConversationDisplayDTO[]) => {
        this.conversations = data;
        this.isConversationExist = true;
      },
      (error) => {
        if (error.status === 404) {
          console.log("There are no conversations (404 Not Found)");
        }
      }
    );
    // Subscribe to the Observable to get the username value
    this.username$.subscribe(username => {
      this.username = username;
    })

    this.messageService.messageSent$.subscribe((message) => {
      let conversationFound = false; // Un indicateur pour savoir si une conversation a été trouvée

      for (const conversation of this.conversations) {
        if (conversation.username + "@goat" === message.from || conversation.username + "@goat" === message.to) {
          conversation.lastMessage = message.body;
          if (message.from === conversation.username + "@goat") {
            conversation.isSeen = false;
          }
          conversationFound = true; // Une conversation a été trouvée
        }
      }

      // Si aucune conversation n'a été trouvée, rechargez la liste des conversations
      if (!conversationFound) {
        this.refreshConversations();
      }
    });
  }

// Méthode pour rafraîchir la liste des conversations
  refreshConversations() {
    this.conversationService.getAllConversations().subscribe(
      (data: ConversationDisplayDTO[]) => {
        this.conversations = data;
        this.isConversationExist = true;
      },
      (error) => {
        if (error.status === 404) {
          console.log("There are no conversations (404 Not Found)");
        }
      }
    );
  }

  onConversationClick(username: string) {
    // Update usernameOtherUser with the selected conversation's username
    this.userOnConversationService.updateUsername(username);
    const conversation = this.conversations.find(conversation => conversation.username === username);
    if (conversation) {
      conversation.isSeen = true;
    }

  }

}
