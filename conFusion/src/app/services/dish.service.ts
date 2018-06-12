import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of, from } from 'rxjs';
import { delay, toArray, catchError } from 'rxjs/operators';

import { Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { ProcessHttpMsgService } from './process-httpmsg.service';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpMsgService) { }

    getDishes(): Observable<Dish[]> {
      return this.restangular.all('dishes').getList();
    }

    getDish(id: number): Observable<Dish> {
      return  this.restangular.one('dishes', id).get();
    }

    getFeaturedDish(): Observable<Dish[]> {
      return this.restangular.all('dishes').getList({featured: true});
    }

    getDishIDs(): Observable<number[]> {
      return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)));
    }
}
