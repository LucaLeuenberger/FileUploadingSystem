import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent{

  URL: string = 'http://localhost:3000/';

  constructor( private router: Router, private http: HttpClient) { }

  registrationForm:FormGroup = new FormGroup({ 
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });


  onSubmit(): void {
    this.http.post(this.URL+'register', this.registrationForm.value)
  }

  OnBackToLogin() {
    this.router.navigate([ '/login']);
  }
}