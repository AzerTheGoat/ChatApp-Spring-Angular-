import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled';
  afficherRectangleADroite: boolean = false;

  afficherRectangle() {
    this.afficherRectangleADroite = true;
  }
  PageParametre1 : boolean = false;

  onclickParametre(){
    this.PageParametre1 = !this.PageParametre1;
    console.log("iubfsiu");
  }
}
