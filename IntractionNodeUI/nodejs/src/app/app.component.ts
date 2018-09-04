import { Component } from '@angular/core';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: String;
  age: Number;

  list;
  constructor(private service: ServiceService) { }

public OnRead() {
    console.log("read button");
    this.service.readData(this.name).subscribe((response: any) => {
      console.log("Response", response);
      console.log(response.result.name);
      this.list = response;
      this.name = response.result.name;
      this.age = response.result.age;
      if (response.success) {
        this.name = response.result.name;
        this.age = response.result.age;
        alert(response.message);
      }
      else {
        alert(response.message);
      }
    }, (err) => {
      alert(err.message);
      this.name = null;
    })

  }
  public OnAdd() {
    console.log("added");
    const data = { name: this.name, age: this.age };
    this.service.addData(data).subscribe((response: any) => {
      console.log("Response", response);
      if (response.success) {
        alert(response.message);
      } else {
        alert(response.error);
      }

    })

  }

  public OnUpdate() {
    console.log('UPDATE BUTTON');
    const data = { name: this.name,age: this.age};
    this.service.updateData(this.name, data).subscribe((response: any) => {
      console.log("Response: ", response);
      if (response.success) {
        this.name = null;
        this.age = null;
        alert(response.message);
      } else {
        alert(response.message);
      }
    }, (err) => {
      alert(err.message)
    });
  }

  //function to delete data
  public OnDelete() {
    console.log('DELETE BUTTON');
    this.service.deleteData(this.name).subscribe((response: any) => {
      if (response.success) {
        this.name = null;
        this.age = null;
        alert(response.message)
      } else {
        alert(response.message);
      }
    }, (err) => {
      alert(err.message)
    });
  }
}
