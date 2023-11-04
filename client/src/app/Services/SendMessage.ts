import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class sendMessage {
  constructor(private http: HttpClient) {}

  private backendUrl = 'http://localhost:8080/message';

  sendMessage(to: string,type:String, body: string): Observable<any> {
    const body1 = {
      to,
      type,
      body
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(this.backendUrl, body1, { headers, withCredentials: true });
  }
}