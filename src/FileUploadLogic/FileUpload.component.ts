import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-load',
  styleUrls: ['./app.FileUpload.css'],
  templateUrl: './app.FileUpload.html',
})
export class UploadComponent implements OnInit{
  selectedFile: File | null = null;
  uploadedFiles: string[] = [];
  files: any;
  URL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  async onUpload() : Promise<void> {
    const fd = new FormData();
    if (this.selectedFile) {
      fd.append('file', this.selectedFile, this.selectedFile.name);
     this.http.post(this.URL+'upload', fd)
        .subscribe(res => {
          console.log(res);
        });

    } else {
      console.log('Keine Datei ausgewählt');
    }
  }

  getFiles() {
    return this.http.get(this.URL+'files').subscribe((files: any) => {
      files.forEach((element: { contentType: string; }) => {
        const i = files.indexOf(element);
        const contentType = element.contentType.split('/')[1];
        if (contentType == 'jpeg' || contentType == 'jpg' || contentType == 'png' || contentType == 'gif') {
          files[i].image = '<img src="../assets/landscape-placeholder.svg" style="width: 100px; height: 100px;">';
        }
      });
      this.files = files;
    })
  }

  ngOnInit() {
    this.files = [];
    this.getFiles();
    console.log(this.files);
  }


}
