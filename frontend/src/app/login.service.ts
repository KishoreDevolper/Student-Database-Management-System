import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }
  apiUrl='http://localhost:3000/student'; 
    

login(data:any){

  return this.httpClient.post(this.apiUrl,data,{
    headers: new HttpHeaders().set('Content-Type',"application/json")
  })
}

}
