import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../service/auth.service';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
mes;
  loginUserData = {}
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.maxLength(8),Validators.pattern('$/0-9|A-Z|a-z|')]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  loginUser () {
    this.auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/create'])
      },
      err => 
     this.mes="user not found"
      // console.log(err)
    ) 
  }
Register(){
  this.router.navigate(['/signup']);
}
}
