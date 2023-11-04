import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageDacceuilComponent} from "./Components/PageDacceuil/PageDacceuil";
import {LoginPageComponentComponent} from "./Components/LoginPageComponent/LoginPageComponent.component";
import { RectangleCentralComponentComponent } from './Components/RectangleCentralComponent/RectangleCentralComponent/RectangleCentralComponent.component';


const routes: Routes = [
  {
    path: 'main',
    component: PageDacceuilComponent,
  },
  {
    path: '',
    component: LoginPageComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
