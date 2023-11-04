import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileDTO } from '../Model/UserProfileDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backendUrl = 'http://localhost:8080/user/all';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<UserProfileDTO[]>(this.backendUrl,{withCredentials:true });
  }
}