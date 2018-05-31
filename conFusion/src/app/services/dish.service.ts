import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DishService {

  constructor() { }

  getDish(id: number): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }
  getDishIDs(): Observable<number[]> {
    return of(DISHES.map(dish => dish.id)).pipe(delay(2000));
  }
}
