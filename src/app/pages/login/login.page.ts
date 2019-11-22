import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CredentialsDTO } from 'src/app/model/credentials.dto';
import { StorageService } from 'src/app/services/storage.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  creds: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(private router: Router, private service: AuthService, private storageService: StorageService) { }

  ngOnInit() {
    console.log(this.storageService.getLocalUser)
  }

  ionViewDidEnter() {
    if (this.storageService.getLocalUser) {
      this.service.refreshToken()
        .subscribe(response => {
          console.log(response)
          this.service.successfulLogin(response.headers.get('Authorization'));
          this.router.navigate(['/grupos'])
        },
          error => { console.log(error) });
    }
  }


  login(form: NgForm) {
    this.creds.email = form.value.email
    this.creds.password = form.value.password
    this.service.authenticate(this.creds)
      .subscribe(response => {
        this.service.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['/grupos'])
      },
        error => { });
  }
}
