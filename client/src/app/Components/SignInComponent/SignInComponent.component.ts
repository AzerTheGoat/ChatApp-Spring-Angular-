import { Component } from '@angular/core';
import { LoginService } from "../../LoginService";
import { Router } from "@angular/router";
import { SignUpService } from "../../Services/SignUpService";

@Component({
  selector: 'app-SignInComponent',
  templateUrl: './SignInComponent.component.html',
  styleUrls: ['./SignInComponent.component.css']
})
export class SignInComponentComponent {
  email: string = '';
  password: string = '';
  isSignUpPerfectly: boolean = false;
  isErrorOnSignUp: boolean = false;

  constructor(private loginService: LoginService, private signUpService: SignUpService, private router: Router) {}

  clickOnSignUpButton() {
    // Access form inputs using ngModel
    if (this.email && this.password) {
      this.signUpService.signUp(this.email, this.password).subscribe(
        (response: any) => {
          if (response && response.message) {
            console.log("Connexion réussie: " + response.message);
            this.isSignUpPerfectly = true;
            this.isErrorOnSignUp = false;
          }
        },
        (error) => {
          console.error("Erreur lors de la connexion : ", error);
          if (error.status === 500) {
            this.isErrorOnSignUp = true;
            this.isSignUpPerfectly = false;
          }
        }
      );
    }
  }
}
