import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
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
  //@ts-ignore
  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
  });
  submitComment: any;
  commentAdder= new FormControl('');
  constructor(private fb:FormBuilder, private commentServ: CommentsService, private router: Router) { }

  ngOnInit(): void {
  }

  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('comment')?.addValidators([Validators.required]);
    return formGroup;
  }
  addComment(){
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('comment')) {
        this.commentServ.create(this.commentsForm.value).then(_=> {
            this.router.navigateByUrl("/forum")
          }
        ).catch(err => console.error(err))
      }
    }
  }
  ngOnChanges(): void {
    this.commentServ.getAll().subscribe(comments => {
      this.comments = comments;
    })
  }
}
