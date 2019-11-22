// import { LoginService, User } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/model/user.dto';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage implements OnInit {

  novoUsuario: UserDTO = {
    email: '',
    password: '',
    name: ''
  };

  isSubmit: boolean = false;

  constructor(private userService: UserService,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {

  }

  onSubmit() {
    this.register(this.novoUsuario);
  }

  register(userDTO: UserDTO) {
    this.userService.signUp(userDTO).subscribe(
      response => {
          this.showSuccess()
      },
      error => this.showError()
    )
  }

  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Cadastrado com sucesso!',
      message: 'Efetue login para acessar o App',
      buttons: ['OK']
    });

    await alert.present();
    this.goToLogin();
  }

  async showError() {
    const alert = await this.alertController.create({
      header: 'Opa algo deu errado.',
      message: 'Por favor insira um email valido e uma senha de no minimo 6 caracteres.',
      buttons: ['OK']
    });

    await alert.present();
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
