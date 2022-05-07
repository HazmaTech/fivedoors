import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthserviceService} from "../../shared/services/authservice.service";
import {Router} from "@angular/router";
import {Observable, Subscription, timeout} from "rxjs";
import {LoadingServiceService} from "../../shared/services/loading-service.service";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email = new FormControl('');
  password = new FormControl('');
  loading: boolean = false;
  loaddingOb?: Observable<boolean>;
  loadingsub?: Subscription;

  constructor(private auth: AuthserviceService, private router: Router, private loader: LoadingServiceService) {
  }

  ngOnInit(): void {
  }

  async submit() {
    this.loading = true;
    this.auth.login(this.email.value, this.password.value).then(cred => {
        this.loaddingOb = this.loader.loginloader();
        this.loadingsub = this.loaddingOb.subscribe(
          {
            next: (data: boolean) => {
              console.log(data);
              data = true
            }, error: (error) => {
              console.log("asasdasdasd")
              console.error(error);
            }, complete: () => {
              this.loading = false;
              console.log("hopefully enough time for the page to realise that yes, someone logged in...")
              this.router.navigateByUrl("/main");
            }
          }
        );
      }
    ).catch(err => {
      console.log("eh")
      console.log(err);
      this.loading = false;
      this.auth.logout().then(() => console.log("loggetout?")).catch(err => console.log("err"));

    });
  }

  ngOnDestroy() {
    this.loadingsub?.unsubscribe();
  }
}
