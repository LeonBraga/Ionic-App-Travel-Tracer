import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    // console.log(form.value);
    // console.log(form.value.nome);
    // console.log(form.valid);
    this.encontraruser(form.value.nome);
  }

  encontraruser(usuario: string) {
    const userBanco = this.loginService.getUser(usuario);
    
  }

}
