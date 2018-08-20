import { Component, OnInit, Output ,EventEmitter,Input} from '@angular/core';
import {FormBuilder,FormControl, Validators} from '@angular/forms'
import { FormModel, FormModel1 } from '../app.component';

@Component({
  selector: 'app-regsiter',
  templateUrl: './regsiter.component.html',
  styleUrls: ['./regsiter.component.css']
})
export class RegsiterComponent implements OnInit {
  @Input() data:FormModel1;
  @Output() dataChange=new EventEmitter();
  
  form1;
  
  constructor(private fb:FormBuilder) { }
 
  @Output() screenChange=new EventEmitter<boolean>();
  screen:boolean=false;
  
  ngOnInit() {
    this.initForm();
    

  }

   
    initForm() {
      this.form1= this.fb.group({
        tenthmarks: new FormControl(this.data.tenthmarks,Validators.required),
        puc: new FormControl(this.data.puc,Validators.required),
        degree:new FormControl(this.data.degree,Validators.required),
        postdegree:new FormControl(this.data.postdegree,Validators.required)
       
      })
    }
  onNavigateBehind(){
    this.screenChange.emit(this.screen);
    this.dataChange.emit(this.form1.value);
  }
  }
