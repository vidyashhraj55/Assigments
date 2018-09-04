import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  public addData(data) {
    const httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post("http://localhost:8082/user/add", { "data": data }, httpOption)
  }
  public readData(name) {
    return this.http.get(`http://localhost:8082/user/${name}`);
  }
  //Connection to update Data
  public updateData(name, data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.patch(`http://localhost:8082/user/${name}`, { "data": data }, httpOptions);
  }

  //Connection to delete Data
  public deleteData(name) {
    return this.http.delete(`http://localhost:8082/user/${name}`);
  }
}
