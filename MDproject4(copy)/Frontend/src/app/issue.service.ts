import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
issue;
  uri = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.uri}/product/`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/product/${id}`);
  }

  addIssue(name,email,branch,tech,productImage)     
  {
    const issue = new FormData();
      issue.append('name',name);
      issue.append('email',email);
      issue.append('branch',branch);
      issue.append('tech',tech);
      issue.append('productImage',productImage);
      return this.http.post(`${this.uri}/product/add`,issue); 
  }

  updateIssue(id, name,email,branch,tech,productImage) {
    const issue = {
      name: name,
      email: email,
      branch: branch,
      tech: tech,
      productImage:productImage
    };
    
    return this.http.post(`${this.uri}/product/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.delete(`${this.uri}/product/delete/${id}`);
  }
}