import { NgModule } from '@angular/core';
import { UploadComponent } from './FileUpload.component';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    UploadComponent,
  ],
  imports: [HttpClientModule, CommonModule],
  exports: [UploadComponent ], 
})
export class UploadModule {
 }