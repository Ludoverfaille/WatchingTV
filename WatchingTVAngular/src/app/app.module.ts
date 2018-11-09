import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import {RouterModule, Routes} from '@angular/router';

const routes:Routes =[
  {
    path: "", component : AccueilComponent,pathMatch:"full"
  },
  {
    path: "connexion", component:ConnexionComponent
  }

]


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ConnexionComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
