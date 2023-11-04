import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {userOnConversation} from "../../Services/UserOnConversation";

@Component({
  selector: 'app-RectangleADroite',
  templateUrl: './RectangleADroite.component.html',
  styleUrls: ['./RectangleADroite.component.css']
})
export class RectangleADroiteComponent implements OnInit {
  @Input() username!: string ;
  username$: Observable<string>; // Déclarez le type de username$ comme Observable<string>

  constructor(private userOnConversationService: userOnConversation) {
    this.username$ = this.userOnConversationService.username$;
  }

  ngOnInit() {
    this.username$.subscribe(username => {
      this.username = username;
    });
  }
}
