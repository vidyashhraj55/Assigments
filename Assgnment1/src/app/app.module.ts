import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CalComponent } from './cal/cal.component';
// import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    CalComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
    // MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
