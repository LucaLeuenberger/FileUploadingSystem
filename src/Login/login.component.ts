import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private router: Router) {}

  loginForm:FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
  });
  
  onSubmit(): void {
  // TODO: Use EventEmitter with form value
    console.log('onSubmit was called');
    console.log(this.loginForm.value);
  }

  OnRegistation(){
    this.router.navigate(['/register']);
  }
}