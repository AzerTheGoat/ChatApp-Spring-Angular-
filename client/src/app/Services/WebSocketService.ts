import { Injectable } from '@angular/core';
import { Client, StompConfig } from '@stomp/stompjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  connect(): Observable<any> {
    const stompConfig: StompConfig = {
      brokerURL: 'wss://cpoo-router.mightycode.tech/router', // Set the server's URL directly
      connectHeaders: {
        'Origin': 'http://localhost:8081' // Set the origin header to match the server's expected origin
      },
      debug: (str) => console.log(str),
    };

    this.client.configure(stompConfig);

    return new Observable<any>((observer) => {
      this.client.onConnect = (frame) => {
        observer.next(frame);
      };
      this.client.activate();
    });
  }


  subscribe(destination: string, callback: (message: any) => void) {
    this.client.subscribe(destination, (message) => {
      callback(JSON.parse(message.body));
    });
  }

  disconnect() {
    this.client.deactivate();
  }
}

