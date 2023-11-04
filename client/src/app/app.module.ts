import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  CercleBasDroiteComponentComponent
} from "./Components/CercleBasDroite/CercleBasDroiteComponent.component";
import {
  CercleHautGaucheComponentComponent
} from "./Components/CercleHautGauche/CercleHautGaucheComponent.component";
import {
  RectangleCentralComponentComponent
} from "./Components/RectangleCentralComponent/RectangleCentralComponent/RectangleCentralComponent.component";
import {RectangleGaucheComponentComponent} from "./Components/RectangleGaucheComponent/RectangleGaucheComponent";
import {RectangleHautGaucheComponent} from "./Components/RectangleHautGauche/RectangleHautGauche";
import {ReactangleBasGaucheComponent} from "./Components/ReactangleBasGauche/ReactangleBasGauche";
import {
  ConversationHistoriqueComponentComponent
} from "./Components/ConversationHistoriqueComponent/ConversationHistoriqueComponent";
import {
  ConversationEnCoursComponentComponent
} from "./Components/ConversationEnCoursComponent/ConversationEnCoursComponent";
import {RectangleADroiteComponent} from "./Components/RectangleADroite/RectangleADroite";
import {BarHautDroiteComponent} from "./Components/BarHautDroite/BarHautDroite";
import {MessageInputComponent} from "./Components/MessageInput/MessageInput";
import {ConversationComponent} from "./Components/Conversation/Conversation";
import {MessageEnvoyeComponentComponent} from "./Components/MessageEnvoyeComponent/MessageEnvoyeComponent";
import {MessageRecuComponentComponent} from "./Components/MessageRecuComponent/MessageRecuComponent";
import {ReactionComponentComponent} from "./Components/ReactionComponent/ReactionComponent";
import {BouleMouvementComponent} from "./Components/BouleMouvement/BouleMouvement";
import {BcercleGaucheComponent} from "./Components/BcercleGauche/BcercleGauche";
import {BcercleDroiteComponent} from "./Components/BcercleDroite/BcercleDroite";
import {BrectangleCentraleComponent} from "./Components/BrectangleCentrale/BrectangleCentrale";
import {BmessageInputComponent} from "./Components/BmessageInput/BmessageInput";
import {BconversationComponent} from "./Components/Bconversation/Bconversation";
import {PageDacceuilComponent} from "./Components/PageDacceuil/PageDacceuil";
import {LoginPageComponentComponent} from "./Components/LoginPageComponent/LoginPageComponent.component";
import {LoginFormComponentComponent} from "./Components/LoginFormComponent/LoginFormComponent.component";
import {SignInComponentComponent} from "./Components/SignInComponent/SignInComponent.component";
import {RouterLink, RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {BovaleHautComponent} from "./Components/BovaleHaut/BovaleHaut";
import { PageParametresComponent } from './Components/PageParametres/PageParametres';
import { RectangleHautGaucheParametreComponent } from './Components/RectangleHautGaucheParametre/RectangleHautGaucheParametre';
import { RectangleBasGaucheParametreComponent } from './Components/RectangleBasGaucheParametre/RectangleBasGaucheParametre';
import { CercleParametreComponent } from './Components/CercleParametre/CercleParametre';
import {AnimationBuilder} from "@angular/animations";
import {AuthServiceComponent} from "./Services/AuthService.component";
import {HttpClientModule} from "@angular/common/http";
import {SignUpService} from "./Services/SignUpService";
import {MyNameService} from "./Services/MyNameService";
import {SignOutService} from "./Services/SignOutService";
import {GetAllConversationService} from "./Services/GetAllConversationService";
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WebsocketService} from "./Services/WebSocketService";
import {MessageService} from "./Services/MessageService";
import {SharedSearchService} from "./Services/SharedSearchService";



@NgModule({
  declarations: [
    AppComponent,
    CercleBasDroiteComponentComponent,
    CercleHautGaucheComponentComponent,
    RectangleCentralComponentComponent,
    RectangleGaucheComponentComponent,
    RectangleHautGaucheComponent,
    ReactangleBasGaucheComponent,
    ConversationHistoriqueComponentComponent,
    ConversationEnCoursComponentComponent,
    RectangleADroiteComponent,
    BarHautDroiteComponent,
    ConversationComponent,
    MessageEnvoyeComponentComponent,
    MessageRecuComponentComponent,
    ReactionComponentComponent,
    BouleMouvementComponent,
    BcercleGaucheComponent,
    BcercleDroiteComponent,
    BrectangleCentraleComponent,
    BconversationComponent,
    PageDacceuilComponent,
    LoginPageComponentComponent,
    LoginFormComponentComponent,
    SignInComponentComponent,
    BovaleHautComponent,
    PageParametresComponent,
    RectangleHautGaucheParametreComponent,
    RectangleBasGaucheParametreComponent,
    CercleParametreComponent,
    BmessageInputComponent,
    MessageInputComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthServiceComponent, SignUpService, MyNameService, SignOutService, GetAllConversationService,WebsocketService, MessageService, SharedSearchService, ReactangleBasGaucheComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
