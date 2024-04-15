import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConfigComponent } from './config/config.component';
import { DownloaderComponent } from './downloader/downloader.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { PackageSearchComponent } from './package-search/package-search.component';
import { UploaderComponent } from './uploader/uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


// Assuming you have your JSON data in a variable called 'myData'

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    
    CommonModule,
    HttpClientModule,
    ConfigComponent,
    DownloaderComponent,
    HeroesComponent,
    MessagesComponent,
    PackageSearchComponent,
    UploaderComponent,
    FormsModule
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeroes = true;
  showConfig = true;
  showDownloader = true;
  showUploader = true;
  showSearch = true;
  data: any = {}; 
  
  apiUrl = 'https://localhost:7202/RandomName/Api/DownloadReportUploadedJson'; // Replace with your actual endpoint
  stringInput: string = '';
  jsonData: any = {}; // Replace with your actual JSON data structure

  toggleHeroes() { this.showHeroes = !this.showHeroes; }
  toggleConfig() { this.showConfig = !this.showConfig; }
  toggleDownloader() { this.showDownloader = !this.showDownloader; }
  toggleUploader() { this.showUploader = !this.showUploader; }
  toggleSearch() { this.showSearch = !this.showSearch; }

  constructor(private http: HttpClient) { } // For in-component approach
  // constructor(private dataService: DataService) { } // For service approach
  //constructor(private apiService: AppService) {}
  ngOnInit() {
    // Using in-component approach with HttpClient
   //this.http.get<any>('https://localhost:7202/RandomName/Test/GettingRandomUserData10') // Replace with your actual API endpoint
  // this.http.get<JsonWebKey>('https://localhost:7202/RandomName/Test/GettingRandomUserData10')
   //   .subscribe(data => this.data = data);


  }

 
  submitData() {
    this.fetchData();
  }

  fetchData() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set appropriate headers

    const body = {
      stringInput: this.stringInput,
      jsonData: JSON.stringify(this.jsonData)
    };

    this.http.post(this.apiUrl, body, { headers, responseType: 'blob' }) // Specify responseType as 'blob'
      .subscribe(data => {
        this.handleFile(data);
      },
      error => this.handleError(error));
  }

  handleFile(data: Blob) {
    // Handle the returned file data (e.g., save it locally, display a preview)
    const blobUrl = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'file.txt'; // Set appropriate filename
    link.click();
  }

  handleError(error: HttpErrorResponse) {
    console.error('Error fetching data:', error);
    // Handle errors appropriately (e.g., display an error message to the user)
  }
}
