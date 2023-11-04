/*
 Created by goat on 10/21/23
*/

import {Component} from '@angular/core';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MyNameService {
  private backendUrl = 'http://localhost:8080/user/username';

  constructor(private http: HttpClient) {}

  getName() {
    return this.http.get(this.backendUrl, { withCredentials: true });
  }
}
