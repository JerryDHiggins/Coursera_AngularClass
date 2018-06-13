import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ProcessHttpMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpMsgService) { }

  submitFeedback(feedback: Feedback) {
    this.restangular.all('feedback').post(feedback);
  }
}
