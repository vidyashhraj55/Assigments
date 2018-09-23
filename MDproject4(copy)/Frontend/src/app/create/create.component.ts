import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { IssueService } from '../issue.service';
import { HttpClient } from '@angular/common/http';
import {Issue} from '../issue.model';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  uri = 'http://localhost:8081';
  createForm: FormGroup;
  selectedFile=null;
  name:string;
email:string;
branch:string;
tech:String;
productImage:String;
myform:Issue;

  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router,private http:HttpClient) {
    this.createForm = this.fb.group({
      name:['',[Validators.required,Validators.pattern("^[a-zA-Z \s]*$"),Validators.maxLength(15)]],
      email: ['', [Validators.required,Validators.email]],
      branch: ['', Validators.required],
      tech: ['', Validators.required],
      productImage:['',Validators.required]
    });
  }
  // onFileSected(event){
  //   // console.log(event);
  //   this.selectedFile=event.target.files[0];
  // }
// onUpload(){
//   const fd=new FormData();
//   fd.append('image',this.selectedFile,this.selectedFile.name)
// this.http.post(`${this.uri}/add`,fd).subscribe((res)=>{
//   console.log(res);
// })
// }
file;
response;
onFileChanged(event) {
this.file = event.target.files[0];
}

addIssue(){
this.myform=this.createForm.value;
console.log(this.myform.name,this.myform.email,this.myform.branch,this.myform.tech,this.file);


this.issueService.addIssue(this.myform.name,this.myform.email,this.myform.branch,this.myform.tech,this.file).subscribe(()=>{
this.router.navigate(['/list']);
}
)
}

  ngOnInit() {
  }

}
