import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of, from } from 'rxjs';
import { delay, toArray, catchError } from 'rxjs/operators';

import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/catch';
import { ProcessHttpMsgService } from './process-httpmsg.service';

@Injectable()
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpMsgService) { }

    getDishes(): Observable<Dish[]> {
      return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(
        catchError(err => {
          return this.processHTTPMsgService.handleError(err);
      }));
    }

    getDish(id: number): Observable<Dish> {
      return  this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(
        catchError(err => {
          return this.processHTTPMsgService.handleError(err);
      }));
    }

    getFeaturedDish(): Observable<Dish[]> {
      return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(
        catchError(err => {
          return this.processHTTPMsgService.handleError(err);
      }));
    }

    getDishIDs(): Observable<number[]> {
      console.log('getting dishIDs at:' + baseURL + 'dishes');
      return this.getDishes().pipe( map(dishes => dishes.map(dish => dish.id)))
      .pipe(
        catchError(err => {
          return this.processHTTPMsgService.handleError(err);
        }));
    }
}
