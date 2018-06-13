import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable, of } from 'rxjs';

import { Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-httpmsg.service';
import { map } from 'rxjs/operators';


@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpMsgService) { }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.all('leaders').getList({id: id})
    .pipe(map(leaders => leaders[0]));
    // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({ featured: true } )
      .pipe(map(leaders => leaders[0]));
    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }
}
