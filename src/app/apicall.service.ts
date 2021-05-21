import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApicallService {
private url
  constructor(private http:HttpClient) { 
    this.url="https://localhost:44350/api/Employee";
  }
  getData=()=>{
    
    return this.http.get(this.url)
  }
  deleteEmployee=(id)=>{
return this.http.delete(this.url+"?id="+id)
  }
  postEmployee=(employee)=>{
    
    return this.http.post(this.url,employee)
  }
  putEmployee=(id,employee)=>{
    return this.http.put(this.url+"?id="+id,employee)
  }
}
