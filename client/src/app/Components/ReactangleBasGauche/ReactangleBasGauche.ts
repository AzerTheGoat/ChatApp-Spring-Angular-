/*
 Created by zakar on 16/09/2023
*/

import {Component, Injectable, OnInit} from '@angular/core';
import {ConversationDisplayDTO} from "../../Model/ConversationDisplayDTO";

import {userOnConversation} from "../../Services/UserOnConversation";
import { GetAllConversationService } from 'src/app/Services/GetAllConversationService';
import { CommunicationService } from 'src/app/Services/communicationService';
import {MessageService} from "../../Services/MessageService";
import {MyNameService} from "../../Services/MyNameService";
import {SharedSearchService} from "../../Services/SharedSearchService";
@Injectable()
@Component({
  selector: 'app-ReactangleBasGauche', // Le sélecteur HTML pour ce composant
  templateUrl: './ReactangleBasGauche.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./ReactangleBasGauche.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class ReactangleBasGaucheComponent implements OnInit{
  conversations: ConversationDisplayDTO[] = [];
  isConversationExist: boolean = false;
  searchTerm: string = '';
  constructor(private sharedSearchService: SharedSearchService, private conversationService : GetAllConversationService, private username : userOnConversation, private myNameService : MyNameService, private communicationService: CommunicationService, private messageService : MessageService) {}
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
    // Abonnez-vous aux changements de searchTerm
    this.sharedSearchService.currentSearchTerm.subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.filterConversations(); // Appelez la méthode de filtrage
    });

    // Chargez initialement toutes les conversations
    this.refreshConversations();
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

  // Event handler for conversation click
  onConversationClick(username: string) {
    this.communicationService.sendMessageSent();
    this.username.updateUsername(username);
    const conversation = this.conversations.find(conversation => conversation.username === username);
    if (conversation) {
      conversation.isSeen = true;
    }

  }
  // Méthode pour filtrer les conversations
  filterConversations() {
    if (this.searchTerm) {
      this.conversations = this.conversations.filter(conversation =>
        conversation.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // Réinitialisez la liste complète des conversations
      this.refreshConversations();
    }
  }

}
