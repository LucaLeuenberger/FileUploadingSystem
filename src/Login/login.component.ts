import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  URL: string = 'http://localhost:3000/';

  constructor(private router: Router, private http: HttpClient) {}

  loginForm:FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
  });
  
  async onSubmit(): Promise<void> {
    if( this.loginForm.value.username != '' && this.loginForm.value.password != '') {
      this.http.post(this.URL+'login', this.loginForm.value)
        .subscribe(res => {
          console.log(res);
        });
      this.router.navigate(['/main']);
    } else {
      console.log('Incorrect Username or Passwört');
    }
  }

  OnRegistation(){
    this.router.navigate(['/register']);
  }
}