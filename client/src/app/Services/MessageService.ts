import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Message} from "../Model/Message";

@Injectable()
export class MessageService {
  private messageSource = new Subject<Message>();
  messageSent$ = this.messageSource.asObservable();

  sendMessage(message: Message) {
    this.messageSource.next(message);
  }
}
