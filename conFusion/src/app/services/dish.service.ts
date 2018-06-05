import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of, from } from 'rxjs';
import { delay, toArray } from 'rxjs/operators';

import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class DishService {

  constructor(private http: HttpClient) { }

    getDishes(): Observable<Dish[]> {
      return this.http.get<Dish[]>(baseURL + 'dishes');
    }

    getDish(id: number): Observable<Dish> {
      return  this.http.get<Dish>(baseURL + 'dishes/' + id);
    }

    getFeaturedDish(): Observable<Dish[]> {
      return this.http.get<Dish[]>(baseURL + 'dishes?featured=true');
    }

    getDishIDs(): Observable<number[]> {
      console.log('getting dishIDs at:' + baseURL + 'dishes');
      let dishIDs: Array<number>;
      this.getDishes().subscribe(dishes => {
        dishIDs = dishes.map(dish => dish.id);
      });
      return of(dishIDs);
    }
}
