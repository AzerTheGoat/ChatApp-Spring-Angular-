import {Component, OnInit} from '@angular/core';
import {ParametreService} from "../../ParametreService";


@Component({
  selector: 'app-RectangleGaucheComponent',
  templateUrl: './RectangleGaucheComponent.component.html',
  styleUrls: ['./RectangleGaucheComponent.component.css']
})
export class RectangleGaucheComponentComponent implements OnInit{
  showParametre= false;

  constructor(private parametreService: ParametreService) {}

  ngOnInit() {
    // Utilisez subscribe pour écouter les changements de valeur dans le service ParametreService
    this.parametreService.parametre$.subscribe(parametreValue => {
      this.showParametre = parametreValue;
    });
  }
}

