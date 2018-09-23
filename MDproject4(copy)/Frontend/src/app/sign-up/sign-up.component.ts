import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerUserData = {}
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

  registerUser() {
    this.auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        swal({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
          // button: "Aww yiss!"
        });
        localStorage.setItem('token', res.token)
        this.router.navigate(['/signin'])
      },
      err => alert("please fill details to register")
    )      
  }


}
