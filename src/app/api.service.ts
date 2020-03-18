import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const serverPort = 5000;
const apiUrl = 'http://localhost:' + serverPort + '/addForm';
const delUrl = 'http://localhost:' + serverPort + '/delete';
const updateUrl = 'http://localhost:' + serverPort + '/update';
const loginUrl = 'http://localhost:' + serverPort + '/login';
const registerUrl = 'http://localhost:' + serverPort + '/register';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  postData(data): Observable<any> {
    console.log("posting data...");
    return this.http.post(apiUrl, data);    
  }

  delData(data): Observable<any> {
    console.log("deleting data...");
    return this.http.post(delUrl,data);
  }

  updtData(data): Observable<any>  {
    console.log("updating data...");
    return this.http.post(updateUrl,data);
  }

  loginValidate(data) : Observable<any> {
    console.log('validating user...');
    return this.http.post(loginUrl,data);
  }

  registerUser(data) : Observable<any> {
    return this.http.post(registerUrl,data);
  }
}
