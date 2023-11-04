// shared.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root' // Assurez-vous que le service est injecté en tant que service racine pour être partagé globalement
})
export class userOnConversation {
  private usernameSubject = new BehaviorSubject<string>('');
  username$ = this.usernameSubject.asObservable();

  updateUsername(username: string) {
    this.usernameSubject.next(username);
  }

}
