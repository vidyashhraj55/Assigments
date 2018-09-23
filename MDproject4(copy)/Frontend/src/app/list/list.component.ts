import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import swal from 'sweetalert';

import { Issue } from '../issue.model';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  p:number=5;
  issues: Issue[];
  userFilter: any = { name: '' };
  userFilter1: any = { branch: '' };
  order: string = 'name';
  i;
  displayedColumns = ['name', 'email', 'branch', 'tech', 'image', 'actions'];
  imgUrl = "http://localhost:8081/";
  response;
  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService.getIssues().subscribe((res:any)=>{
      console.log(res);
      this.i=res.count;
      this.response=res.products;
      console.log(this.response);
      
      });
      }
  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) { 
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this  file!",
        icon: "warning",
        buttons:['Cancel','Ok']
      })
      .then((willDelete) => {
        if (willDelete) {
          this.issueService.deleteIssue(id).subscribe((res) => {
            console.log(res);
            this.fetchIssues();
          });
          swal("Poof! Your data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your data is safe!");
          this.fetchIssues();
        }
      });
      this.fetchIssues();
  
  }
}

