import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Location} from '@angular/common';
import {AuthserviceService} from "../../shared/services/authservice.service";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    user: new FormControl(''),
    email: new FormControl(''),
    pass: new FormControl(''),
    re: new FormControl('')
  });

  constructor(private auth:AuthserviceService, private router:Router, private uploadUser:UserService) { }

  ngOnInit(): void {
  }

  submit(){
    console.log('submitted');
    if(this.form.get('pass')?.value === this.form.get('re')?.value){
      this.auth.signup(this.form.get('email')?.value, this.form.get('pass')?.value).then(cred =>{
        const user:User = {
          id: cred.user?.uid as string,
          user: this.form.get('user')?.value,
          email: this.form.get('email')?.value,
          doorsPassed: 0
        };
        this.uploadUser.create(user).then(_ => {
          console.log('ok');
        }).catch(error => {
          console.error(error);
        })
        this.router.navigateByUrl('/login');

      }).catch(err => {
        console.log(err);
      })
    }
    else {
      console.log("couldn't register")
      this.router.navigateByUrl('/signup');
    }
  }


  back(){

  }

}
