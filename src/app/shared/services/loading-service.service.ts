import { Injectable } from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {AuthserviceService} from "./authservice.service";

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {
  loggedIn?: firebase.default.User | null;
  constructor(private auth: AuthserviceService) { }
  loginloader(): Observable<boolean> {
    return new Observable((subscriber: Subscriber<boolean>) => {
      let i = 0;
      const timeout = setTimeout(() => {
          console.log(this.loggedIn);
          if (this.auth.isUserLoggedIn()) {
            subscriber.next(true);
            subscriber.complete();
          } else {
            subscriber.error(false);
          }
      }, 100);
    });
  }
}
