import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() currentQuestion = 0;
  constructor() { }

  ngOnInit(): void {
    console.log("BEMENT A HELP INITJÉBE")
    try{
  //@ts-ignore
      this.currentQuestion = JSON.parse(localStorage.getItem("userColl")).doorsPassed;
      console.log(localStorage.getItem("doors"));
    }catch (e){
      console.log(e)
    }
    console.log(this.currentQuestion);
  }

}
