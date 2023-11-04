/*
 Created by goat on 10/21/23
*/

import {Component} from '@angular/core';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SignUpService {
  private backendUrl = 'http://localhost:8080/user/signup';

  constructor(private http: HttpClient) {}

  signUp(login: string, password: string) {
    const body = { login, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.backendUrl, body, { headers});
  }
}
