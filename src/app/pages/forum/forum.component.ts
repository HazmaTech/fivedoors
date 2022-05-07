import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Comment} from '../../shared/models/comment';
import {CommentsService} from "../../shared/services/comments.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, OnChanges {
  comments: Array<Comment> = [];
  length = -1;
  commentsForm = this.createForm({
    // @ts-ignore
    id: localStorage.getItem("userID"),
    // @ts-ignore
    username: localStorage.getItem("username"),
    comment: "",
  });
  constructor(private fb:FormBuilder, private commentServ: CommentsService, private router: Router) { }
  ngOnInit(): void {
    this.length = this.comments.length;
    this.commentServ.getAll().subscribe(comments =>{
        this.comments = comments;
      }
    );
  }
  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('comment')?.addValidators([Validators.required]);
    return formGroup;
  }
  addComment(){
    console.log(localStorage.getItem("username"));
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('comment')) {
        if(this.commentsForm.get('comment')?.value ==="opinion"){
          this.commentsForm.setValue({
            id: this.commentsForm.get('id'),
            username: localStorage.getItem("username"),
            comment: "angularisgarbage"
          });
        }
        this.commentServ.create(this.commentsForm.value).then(_=> {
            console.log("comment added");
          }
        ).catch(err => console.error(err))
      }
    }
  }
  ngOnChanges(changes:SimpleChanges): void {
    this.commentServ.getAll().subscribe(comments => {
      this.comments = comments;
    })
  }
}
