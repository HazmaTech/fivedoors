import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthserviceService} from "../../shared/services/authservice.service";
import {Router} from "@angular/router";
import {timeout} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');

  constructor(private auth: AuthserviceService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async submit() {
    console.log("clicked");
    console.log(this.email.value);
    this.auth.login(this.email.value, this.password.value).then(cred => {
        console.log(cred);
        this.router.navigateByUrl("");
      }
    ).catch(err => {
      console.log(err);
      this.auth.logout().then(()=>console.log("loggetout?")).catch(err => console.log("err"));
    });
  }
}
