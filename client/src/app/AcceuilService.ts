import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcceuilService {
  private conversatioDisplaySubject = new BehaviorSubject<boolean>(false);
  conversationUpDisplay$: Observable<boolean> = this.conversatioDisplaySubject.asObservable();

  toggleAcceuilUpDisplay() {
    this.conversatioDisplaySubject.next(!this.conversatioDisplaySubject.value);
    console.log("rcutuy");
  }
}
