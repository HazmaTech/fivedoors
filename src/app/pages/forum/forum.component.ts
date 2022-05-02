import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Comment} from '../../shared/models/comment';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  comments: Array<Comment> = [];
  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
  });
  submitComment: any;

  commentAdder= new FormControl('');
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required]);
    return formGroup;
  }
  addComment(){
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('username') && this.commentsForm.get('comment')) {

      }
    }
  }
}
