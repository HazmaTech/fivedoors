import {Component, Input, OnInit} from '@angular/core';
import {Doors} from "../../shared/models/doors";
import {FormControl} from "@angular/forms";
import {AuthserviceService} from "../../shared/services/authservice.service";
import {MainhelperService} from "../../shared/services/mainhelper.service";
import {anwsersRaw} from "../../shared/constants/anwsers";
import {ConverterPipe} from "../../shared/pipe/converter.pipe";
import {UserService} from "../../shared/services/user.service";
//import firebase from "firebase/compat";
import * as modelUser from "../../shared/models/user";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() loggedIn?: firebase.default.User | null;
  images?: Array<Doors>;
  chosen?: Doors;
  answer = new FormControl('');
  currentDoor: number = 0;
  src: string = "";
  imageSource: string = "";
  //@ts-ignore
  userCol: modelUser.User = JSON.parse(localStorage.getItem("userColl"));

  constructor(private auth: AuthserviceService, private mainhelp: MainhelperService, private pipe: ConverterPipe, private userService: UserService) {
  }

  ngOnInit(): void {
    this.auth.isUserLoggedIn().subscribe(user => {
      this.loggedIn = user;
      localStorage.setItem('user', JSON.stringify(this.loggedIn));
        this.currentDoor = this.userCol.doorsPassed;
        this.doorUpdate();


    }, error => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify(null));
    });
    console.log(localStorage.getItem('user'));
  }

  submitAns() {
    //let userans = this.pipe.transform(this.answer.value);
    let userans = btoa(this.answer.value)
    console.log((this.currentDoor * 7) % 15)
    let ans = anwsersRaw[(this.currentDoor * 7) % 15]; //shh
    console.log(userans);
    console.log(ans.answer);
    if (userans == ans.answer) {
      console.log("he got it")
      this.currentDoor += 1;
      console.log(localStorage.getItem("userColl"))
      for (let i in this.userCol){
        console.log(i);
        //@ts-ignore
        console.log(userCol[i])
      }
      this.userCol.doorsPassed += 1;
      this.userService.update(this.userCol);
      this.doorUpdate();
    }
  }

  doorUpdate() {
    console.log(this.currentDoor)
    switch (this.currentDoor) {
      case 0:
        this.imageSource = "assets/firstdoor.jpg";
        break;
      case 1:
        this.imageSource = "assets/seconddoor.jpg";
        break;
      case 2:
        this.imageSource = "assets/thirddoor.jpg";
        break;
      case 3:
        this.imageSource = "assets/fourthdoor.jpg";
        break;
      case 4:
        this.imageSource = "assets/fifthdoor.jpg";
        break;
      case 5:
        this.imageSource = "assets/freedom.jpg";
        break;
    }
  }
}
