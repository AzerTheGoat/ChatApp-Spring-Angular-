import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importez le service Router
import { ParametreService } from 'src/app/ParametreService';
import { SignOutService } from 'src/app/Services/SignOutService';
import { userOnConversation } from 'src/app/Services/UserOnConversation';
import { SharedService } from 'src/app/Services/sharedService';



@Component({
  selector: 'app-RectangleBasGaucheParametre',
  templateUrl: './RectangleBasGaucheParametre.component.html',
  styleUrls: ['./RectangleBasGaucheParametre.component.css']
})
export class RectangleBasGaucheParametreComponent {
  constructor(
    private signOutService: SignOutService,
    private router: Router, // Injectez le service Router
    private userOnConversation : userOnConversation,
    private parametreService: ParametreService
  ) {}
  toggleParametre() {
    // Appelez la méthode du service pour inverser la valeur de la variable booléenne
    this.parametreService.toggleParametre();
  }

  logout() {
    // Appelez la méthode signOut du service
    this.signOutService.signOut().subscribe(
      (response) => {
        // La déconnexion a réussi, vous pouvez maintenant naviguer vers la page de connexion
        this.userOnConversation.updateUsername("");
        
        
                
        this.router.navigate(['']); // Assurez-vous d'ajuster le chemin vers la page de connexion

      },
      (error) => {
        // Gérez les erreurs, si nécessaire
        console.error('Erreur lors de la déconnexion :', error);
      }
    );
  }
}