import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccueilComponentComponent } from './accueil-component/accueil-component.component';
import { ConnexionComponentComponent } from './connexion-component/connexion-component.component';



@NgModule({
  declarations: [
    AppComponent,
    AccueilComponentComponent,
    ConnexionComponentComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
