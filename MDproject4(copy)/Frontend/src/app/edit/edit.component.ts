import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { IssueService } from '../issue.service';
import { Issue } from '../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;
  productimage;
  imgUrl = "";
  file;
   response;
   image;
   myform:Issue;
  // tslint:disable-next-line:max-line-length
  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      branch: ['', Validators.required],
      tech: ['', Validators.required],
      productImage: ''

    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
      this.issueService.getIssueById(this.id).subscribe((res: any)=>{ 
        // console.log(res.product.productImage);
        this.imgUrl += res.product.productImage;
        console.log(this.imgUrl);
       this.image = res.product.productImage;
        this.updateForm.get('name').setValue(res.product.name);
        this.updateForm.get('email').setValue(res.product.email);
        this.updateForm.get('branch').setValue(res.product.branch);
        this.updateForm.get('tech').setValue(res.product.tech);
        // this.updateForm.get('productImage').setValue(this.image);
      });
    });
  }
  onFileChanged(event) {
    this.file = event.target.files[0];
    this.productimage = this.file;
  }
  updateIssue() {
    this.myform=this.updateForm.value;
    this.issueService.updateIssue(this.id,this.myform.name,this.myform.email,this.myform.branch,this.myform.tech,this.productimage).subscribe(() => {
      this.snackBar.open('Issue Updated Successfully', 'OK', {
        duration: 2000
      });
    });
    debugger;
  }

}