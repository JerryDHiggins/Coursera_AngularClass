import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  // constructor() { }
  ngOnInit() {
  }

  openLoginForm() {
    // this.dialog.open(LoginComponent, {width: '500', height: '450'});
    this.dialog.open(LoginComponent, {width: '450px', height: '330px'});
  }

}
