import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthserviceService} from "./shared/services/authservice.service";
import {UserService} from "./shared/services/user.service";
import {User} from "./shared/models/user"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FiveDoors';
  page = '';
  routes: Array<string> = [];
  loggedIn?: firebase.default.User | null;


  constructor(private router: Router, private auth: AuthserviceService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.routes = this.router.config.map(conf => conf.path) as string[];
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evt: any) => {
      const currentPage = (evt.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });
    this.auth.isUserLoggedIn().subscribe(user => {
      this.loggedIn = user;
      localStorage.setItem('user', JSON.stringify(this.loggedIn));
      // @ts-ignore
      localStorage.setItem('userID', this.loggedIn.uid);
      let currentuser: User;
      // @ts-ignore
      this.userService.getById(this.loggedIn.uid).subscribe(userr => {
          console.log(userr);
          // @ts-ignore
          localStorage.setItem("username", userr.user);
          // @ts-ignore
          localStorage.setItem("doors", userr.doorsPassed);
          //@ts-ignore
          localStorage.setItem("userColl", JSON.stringify(userr));
        }
      );
      console.log(localStorage.getItem("username"))
    }, error => {
      localStorage.setItem('user', JSON.stringify(null))
    })
  }

  changePage(selected: string) {
    console.log(selected)
    this.router.navigateByUrl(selected);
  }

  onToggle(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event) {
      sidenav.close()
    }
  }

  async logout(_?: boolean) {
    this.auth.logout().then(() => {
      this.router.navigateByUrl("/login")
    }).catch(error => {
      console.error(error);
    });
  }


}
