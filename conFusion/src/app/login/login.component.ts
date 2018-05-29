import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule, MatInputModule, MatFormFieldModule, MatCheckboxModule } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {remember: false,
          username: '',
          password: ''};
  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.dialogRef.close();
  }
}