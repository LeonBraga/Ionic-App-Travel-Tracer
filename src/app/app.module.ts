import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
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
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { GroupService } from './services/groups.service';
import { UserService } from './services/user.service';
import { AuthInterceptorProvider } from './interceptor/auth-interceptor';



@NgModule({
  declarations: [AppComponent, AddGastoModalPage],
  entryComponents: [ AddGastoModalPage ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    AuthInterceptorProvider,
    AuthService,
    StorageService,
    GroupService,
    UserService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
