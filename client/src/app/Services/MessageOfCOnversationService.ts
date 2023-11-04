import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../Model/Message';
import { UserProfileDTO } from '../Model/UserProfileDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesOfConversation {
  constructor(private http: HttpClient) {}
  private backendUrl = "http://localhost:8080/message/getAllMessagesOfConversation";

  getAllMessagesOfConversation(login: string): Observable<Message[]> {
    const body = { login };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Message[]>(this.backendUrl, body, { headers, withCredentials:true });
  }
}