// import { LoginService, User } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage implements OnInit {

  // novoUsuario: User = {
  //   email: '',
  //   password: '',
  //   name:''
  // };

  isSubmit: boolean = false;

  // constructor(private loginService: LoginService,
  //   private router: Router,
  //   public alertController: AlertController,
  //   private fAuth: AngularFireAuth) { }

  ngOnInit() {

  }

  // onSubmit() {
  //   this.register(this.novoUsuario);
  // }

  // async register(user: User) {
  //   try {
  //     var hasValidUser = await this.fAuth.auth.createUserWithEmailAndPassword(
  //       user.email,
  //       user.password
  //     );
    
  //     if (hasValidUser) {
  //       console.log("Successfully registered!");
  //       this.loginService.addUser(this.novoUsuario)
  //       this.showSuccess()
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     this.showError()
  //   }
  // }

  // async showSuccess() {
  //   const alert = await this.alertController.create({
  //     header: 'Cadastrado com sucesso!',
  //     message: 'Efetue login para acessar o App',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  //   this.go();
  // }

  // async showError() {
  //   const alert = await this.alertController.create({
  //     header: 'Opa algo deu errado.',
  //     message: 'Por favor insira um email valido e uma senha de no minimo 6 caracteres.',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

  // go() {
  //   this.router.navigateByUrl('/login');
  // }
}
