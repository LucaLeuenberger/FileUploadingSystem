import { NgModule } from '@angular/core';
import { UploadComponent } from './FileUpload.component';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UploadComponent,
  ],
  imports: [HttpClientModule, CommonModule, FormsModule],
  exports: [UploadComponent ], 
})
export class UploadModule {
 }