import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadModule } from '../FileUploadLogic/upload.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, UploadModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FileUploadingSystem';
}
