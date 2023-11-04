import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MessageUpdateService {
  private messageSentSource = new Subject<void>();

  messageSent$ = this.messageSentSource.asObservable();

  sendMessage() {
    this.messageSentSource.next();
  }
}