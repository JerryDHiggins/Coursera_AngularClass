import { Component, OnInit, Input, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIDs: number[];
  next: number;
  prev: number;
  commentForm: FormGroup;
  comment: Comment;
  stars: number[];

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) {
      this.createForm();
    }
    formErrors = {
      'author': '',
      'comment': ''
    };
    validationMessages = {
      'author': {
        'required':   'Author is required.',
        'minlength':  'Author must be at least 2 characters long.'
      },
      'comment': {
        'required':   'Comment is required.',
        'minlength':  'Comment must be at least 2 characters long.'
      }
    };
  ngOnInit() {
    this.dishservice.getDishIDs()
      .subscribe( dishIDs => { this.dishIDs = dishIDs; });
    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(+params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }
  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: [5],
      comment: ['', [Validators.required, Validators.minLength(2)] ]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toLocaleDateString();
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });
  }
  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishID: number) {
    // find the index of this dishID
    const dishIX = this.dishIDs.indexOf(dishID);
    this.next = this.dishIDs[(this.dishIDs.length + dishIX + 1) % this.dishIDs.length];
    this.prev = this.dishIDs[(this.dishIDs.length + dishIX - 1) % this.dishIDs.length];
  }
}
