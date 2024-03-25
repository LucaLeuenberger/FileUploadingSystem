import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./Login/login.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";

@NgModule({
  imports: [CommonModule, RouterModule ,ReactiveFormsModule, FormsModule],
  declarations: [LoginComponent, RegistrationComponent],

})

export class AuthModule { }
