import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
screen:boolean=true;
formData:FormModel=new FormModel();
formData1:FormModel1=new FormModel1();
changeScreen(e){
  this.screen=!e;

}
}

export class FormModel{
  firstname:string;
  lastname:string;
  address:string;
  city:string;
  state:string;
  gender:string;
}
export class FormModel1{
  tenthmarks:string;
  puc:string;
  degree:string;
  postdegree:string;
}
