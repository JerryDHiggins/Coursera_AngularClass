import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';
import { expand } from '../animations/app.animation';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    expand()
  ]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
      .subscribe( leaders => this.leaders = leaders);
  }

}
