import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( public authService: AuthServiceService) {}
  //authentication variables
  email: string = '';
  password: string = '';
  user: string = '';
  
  signIn() {
    this.user = this.email;
    this.authService.signIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }
  ngOnInit(): void {
  }

}
