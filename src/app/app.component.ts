import { Component } from '@angular/core';
import { NgxPrintElementService } from 'ngx-print-element';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loan-system';
  //authentication variables
  email: string = '';
  password: string = '';
  user: string = '';

  constructor(public print: NgxPrintElementService, public authService: AuthServiceService) {}

  signIn() {
    this.user = this.email;
    this.authService.signIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authService.signOut();
  }
}
