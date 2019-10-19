import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router,
    private fAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login(form: NgForm) {
    try {
      var hasValidLogin = await this.fAuth.auth.signInWithEmailAndPassword(
        form.value.email,
        form.value.password,
      );

      if (hasValidLogin) {
        console.log("Successfully logged in!");
      }

    } catch (err) {
      console.error(err);
    }
  }
}
