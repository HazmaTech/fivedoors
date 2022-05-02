import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  menuS(){
    this.selected.emit(this.current);
  }
  onCloseMenu(){
    this.onClose.emit(true);
  }

}
