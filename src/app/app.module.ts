import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';

import { AddGastoModalPage } from './pages/add-gasto-modal/add-gasto-modal.page';
import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [AppComponent, AddGastoModalPage],
  entryComponents: [ AddGastoModalPage ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  exports: [AddGastoModalPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
