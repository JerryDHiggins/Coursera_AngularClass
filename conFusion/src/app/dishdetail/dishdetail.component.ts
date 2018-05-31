import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

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

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.dishservice.getDishIDs()
      .subscribe( dishIDs =>  this.dishIDs = dishIDs);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(+params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishID: number) {
    // find the index of this dishID
    const dishIX = this.dishIDs.indexOf(dishID);
    this.next = this.dishIDs[(dishIX + 1) % this.dishIDs.length];
    this.prev = this.dishIDs[(dishIX - 1) % this.dishIDs.length];
  }
}
