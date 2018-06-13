import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-httpmsg.service';
import { map } from 'rxjs/operators';


@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpMsgService) { }
    // return this.restangular.all('dishes').getList();

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
    // return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.restangular.one('promotions', id).get();
    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return this.restangular.all('promotions').getList({ featured: true } );
    return this.restangular.all('promotions').getList({ featured: true } )
      .pipe(map(promotions => promotions[0]));
    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }
}
