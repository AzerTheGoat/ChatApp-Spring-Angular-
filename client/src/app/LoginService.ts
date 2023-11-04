import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private signUpDisplaySubject = new BehaviorSubject<boolean>(false);
  signUpDisplay$: Observable<boolean> = this.signUpDisplaySubject.asObservable();

  toggleSignUpDisplay() {
    this.signUpDisplaySubject.next(!this.signUpDisplaySubject.value);
  }
}
