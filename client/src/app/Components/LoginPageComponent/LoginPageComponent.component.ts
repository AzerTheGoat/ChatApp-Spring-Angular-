/*
 Created by goat on 9/16/23
*/

import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../LoginService";
import {MyNameService} from "../../Services/MyNameService";


@Component({
  selector: 'app-LoginPageComponent', // Le sélecteur HTML pour ce composant
  templateUrl: './LoginPageComponent.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./LoginPageComponent.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class LoginPageComponentComponent implements OnInit{
  signUpDisplay: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.signUpDisplay$.subscribe(display => {
      this.signUpDisplay = display;
    });
  }
}
