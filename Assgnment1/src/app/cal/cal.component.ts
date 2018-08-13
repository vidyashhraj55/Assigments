import { Component } from '@angular/core';
import {FormBuilder,FormControl,Validator} from '@angular/forms'
@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})
export class CalComponent {
  testform;
  public num1:number;
  public num2:number;
  public result:number;
 
  constructor(
    private fb:FormBuilder
  ) { }

  cal_add(){
    this.result=this.num1+this.num2;
  }
  cal_sub(){
    this.result=this.num1-this.num2;
  }
  cal_mul(){
    this.result=this.num1*this.num2;
  }
  cal_div(){
    if(this.num2==0){
      return "divide by zero error" ;
    }
      else{
    this.result=this.num1/this.num2;}
  }
  initform(){
    this.testform=this.fb.group({

    })
  }

}