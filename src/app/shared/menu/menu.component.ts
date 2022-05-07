import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthserviceService} from "../services/authservice.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @Input() current: string = '';
  @Input() loggedIn?: firebase.default.User | null;
  @Output() selected: EventEmitter<string> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCheck: boolean = false;
  constructor(private auth: AuthserviceService) {
  }

  ngOnInit(): void {
    this.auth.isUserLoggedIn().subscribe(user =>{ //this part took me more than a day to figure out why logging in does not display a side menu, but after redirecting to a page it does
      if(user !== null){
        this.loggedIn = user; //man I hate this language
        this.menuCheck = true
      }
      else{
        this.menuCheck = false;
      }
    });
  }
  ngAfterViewInit(): void {
  }
  menuS(){
    this.selected.emit(this.current);
  }
  onCloseMenu(){
    this.onClose.emit(true);
  }
  logoutHelper(){
    this.onLogout.emit(true);
  }

}
