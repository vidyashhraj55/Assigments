import { Component, OnInit ,EventEmitter,Output, Input} from '@angular/core';

import {FormBuilder,FormControl, Validators} from '@angular/forms';
import { FormModel } from '../app.component';
export interface City{
  value:string;
  viewValue:string;
}
export interface State{
  value:string;
  viewValue:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form;
 
 @Input() data:FormModel;
 @Output() dataChange=new EventEmitter();

  constructor(private fb:FormBuilder) { }
  @Output() screenChange=new EventEmitter<boolean>();
  screen:boolean=true;
  citys: City[]=[
    {value: 'bangalore', viewValue: 'bangalore'},
    {value: 'mysore', viewValue: 'mysore'},
  ];
  states:State[]=[
    {value: 'karnataka', viewValue: 'karnataka'},
    {value: 'andra', viewValue: 'andra'},
  ];

  
  ngOnInit() {
    this.initForm();
  }

initForm() {
  this.form = this.fb.group({
    firstname: new FormControl(this.data.firstname,Validators.required),
    lastname: new FormControl(this.data.lastname,Validators.required),
    address: new FormControl(this.data.address,Validators.required),
    city: new FormControl(this.data.city,Validators.required),
    state: new FormControl(this.data.state,Validators.required),
    gender: new FormControl(this.data.gender,Validators.required)
  
   
  })
}
onNavigateForward(){
this.screenChange.emit(this.screen);
this.dataChange.emit(this.form.value);
}
}
