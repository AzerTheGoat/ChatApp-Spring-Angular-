import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isListVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isListVisible$: Observable<boolean> = this.isListVisibleSubject.asObservable();

  toggleListVisibility(): void {
    this.isListVisibleSubject.next(!this.isListVisibleSubject.value);
  }
}