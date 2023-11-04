import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class ParametreService {
  private parametreSubject = new BehaviorSubject<boolean>(false);
  parametre$: Observable<boolean> = this.parametreSubject.asObservable();

  toggleParametre() {
    this.parametreSubject.next(!this.parametreSubject.value);
  }
}


