import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ConversationDisplayDTO} from "../Model/ConversationDisplayDTO";

@Injectable()
export class GetAllConversationService{
  private backendUrl = 'http://localhost:8080/conversation/getAllConversationsOfUser';

  constructor(private http: HttpClient) {}

  getAllConversations(): Observable<ConversationDisplayDTO[]> {
    return this.http.get<ConversationDisplayDTO[]>(this.backendUrl, { withCredentials: true });
  }
}
