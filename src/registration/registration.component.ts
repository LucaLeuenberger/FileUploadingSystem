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


  async onSubmit(): Promise<void> {
    if(this.registrationForm.value.password == this.registrationForm.value.confirmPassword
      && this.registrationForm.value.username != '' && this.registrationForm.value.password != '') {
      this.http.post(this.URL+'register', this.registrationForm.value)
        .subscribe(res => {
          console.log(res);
        });
      this.router.navigate(['/login']);
    } else {
      console.log('Passwörter stimmen nicht überein oder Felder sind leer');
    }
  }

  OnBackToLogin() {
    this.router.navigate(['/login']);
  }
}