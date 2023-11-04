/*
 Created by zakar on 17/09/2023
*/

import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../../Services/WebSocketService";
import {MyNameService} from "../../Services/MyNameService";
import {MessageService} from "../../Services/MessageService";

@Component({
  selector: 'app-PageDacceuil', // Le sélecteur HTML pour ce composant
  templateUrl: './PageDacceuil.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./PageDacceuil.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class PageDacceuilComponent implements OnInit {
  messageRouter: any;
  currentUsername !: string ;
  domain : string = "goat";

  constructor(private websocketService: WebsocketService, private myNameService : MyNameService, private messageService : MessageService) {}

  ngOnInit(): void {
    this.myNameService.getName().subscribe(
      (response: any) => {
        this.currentUsername = response.username +"@"+ this.domain;
        this.websocketService.connect().subscribe(() => {
          this.websocketService.subscribe('/domain/'+this.domain+'/messages', (message) => {
            if(message.to === this.currentUsername || message.from === this.currentUsername) {
              this.messageRouter = message;
              // Envoie le message au service de communication
              this.messageService.sendMessage(message);
              console.log("je recois un nouveau message" + message.body);
            }
          });
        });
      },
      (error) => {
        console.error('Error fetching username:', error);
      }
    );

  }


}
