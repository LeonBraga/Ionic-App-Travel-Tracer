import { LoginService, User } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage implements OnInit {
  novoUsuario: User = {
    login: '',
    senha: ''
  };

  isSubmit: boolean = false;

  private usuarios: Observable<User[]>;

  constructor(private loginService: LoginService, private router: Router, public alertController: AlertController) {}

  ngOnInit() {
    this.usuarios = this.loginService.getUsers();
  }

  onSubmit() {
    this.loginService.addUser(this.novoUsuario);
    this.exibirAlerta();
  }

  async exibirAlerta() {
    const alert = await this.alertController.create({
      header: 'Cadastrado com sucesso!',
      message: 'Efetue login para acessar o App',
      buttons: ['OK']
    });

    await alert.present();
    this.go();
}

  go() {
    this.router.navigateByUrl('/login');
  }
}
