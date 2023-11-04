import { Component } from '@angular/core';
import { LoginService } from "../../LoginService";
import { AuthServiceComponent } from "../../Services/AuthService.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-LoginFormComponent',
  templateUrl: './LoginFormComponent.component.html',
  styleUrls: ['./LoginFormComponent.component.css']
})
export class LoginFormComponentComponent {
  email: string = '';
  password: string = '';
  isPasswordErrone: boolean = false;
  isAlreadySignIn: boolean = false;

  constructor(private loginService: LoginService, private authService: AuthServiceComponent, private router: Router) {}

  clickOnSignInButton() {
    this.loginService.toggleSignUpDisplay();
  }

  clickOnLoginButton() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (response && response.message) {
          console.log("Connexion réussie: " + response.message);
          this.router.navigate(['/main']);
        }
      },
      (error) => {
        console.error("Erreur lors de la connexion : ", error);

        if (error.status === 401) {
          this.isPasswordErrone = true;
          this.isAlreadySignIn = false;
        } else if (error.status === 500) {
          this.isPasswordErrone = true;
          this.isAlreadySignIn = false;
        } else if (error.status === 409) {
          this.isAlreadySignIn = true;
          this.isPasswordErrone = false;
        }
      }
    );
  }
}
