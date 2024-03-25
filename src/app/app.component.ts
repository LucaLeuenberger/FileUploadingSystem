import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UploadModule } from '../FileUploadLogic/upload.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthModule} from '../auth.guard.spec';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, UploadModule, RouterModule, ReactiveFormsModule, FormsModule, AuthModule],
  template: '<router-outlet></router-outlet>', 
})

export class AppComponent {
  title = 'File Uploading System';
}
