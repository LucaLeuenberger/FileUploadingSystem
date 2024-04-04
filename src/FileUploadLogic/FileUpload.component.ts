import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjectId } from 'mongodb';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-load',
  styleUrls: ['./app.FileUpload.css'],
  templateUrl: './app.FileUpload.html',
})
export class UploadComponent implements OnInit{
  @ViewChildren('flieboxs') fileboxs!: QueryList<ElementRef>;
  selectedFile: File | null = null;
  uploadedFiles: string[] = [];
  upDateFile: boolean = false;
  newfilename: string = '';
  files: any;
  URL: string = 'http://localhost:3000/';
  

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

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

    window.location.reload();
  }

  downloadFile(fileId: ObjectId, filename: string) {
    this.http.get(this.URL+`download/${fileId}`, { responseType: 'blob' }).subscribe((res: any) => {
      // download file from response
      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }


  updateFile(file: any) {
    this.selectedFile = file;
    this.newfilename = file.filename;
    if (this.fileboxs) {
      this.fileboxs.forEach((filebox: ElementRef) => {
        if (filebox.nativeElement.children[0].innerText == file.filename) {
          const children = filebox.nativeElement.children;

          for (let i = 0; i < children.length; i++) {
            if (children[i].localName != 'p'){
            children[i].hidden = !children[i].hidden;
            }
          }
        }
      });
    }
  }

  updateFileChanges(fileId: ObjectId) {
    try {
      this.http.put(this.URL+`file/${fileId}`, { filename: this.newfilename })
        .subscribe(res => {
          console.log(res);
        });
        window.location.reload();
    } catch (error) {
      console.log(error);
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

  deleteFile(fileId: ObjectId) {
    this.http.delete(this.URL+`file/${fileId}`).subscribe(() => {
      this.files = this.files.filter((file: { _id: ObjectId; }) => file._id !== fileId);
    });

    window.location.reload();
  }

  ngOnInit() {
    this.files = [];
    this.getFiles();
    console.log(this.files);
  }


}
