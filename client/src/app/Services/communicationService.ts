import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private messageSentSource = new Subject<void>();

  // Observable pour écouter les événements de message envoyé
  messageSent$ = this.messageSentSource.asObservable();

  // Méthode pour déclencher un événement de message envoyé
  sendMessageSent() {
    this.messageSentSource.next();
  }
}