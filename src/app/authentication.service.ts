import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl='http://localhost:7070/customers/';
  constructor(private http:HttpClient) { }

  generateToken(request:any){
    return this.http.post<any>(`${this.baseUrl}/authenticate`,request,{responseType:'text' as 'json'})
  }

  welcome(token:any){
    let tokenStr='Bearer '+token;
    const headers= new HttpHeaders().set('Authorization',tokenStr);

    return this.http.get<String>("http://localhost:9110/",{headers,responseType:'text' as 'json'})
  }

}
