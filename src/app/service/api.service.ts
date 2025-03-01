import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/employee";

 addEmployee(data:any){
  return this.http.post(this.url, data);
 }

 updateEmployee(id:any, data:any){
  return this.http.put(`${this.url}/${id}`, data);
 }

 deleteEmployee(id:any){
  return this.http.delete(`${this.url}/${id}`);
 }

 getEmployees(){
  return this.http.get(this.url);
 }

}
