import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  name: FormControl;
  person: FormControl;

  constructor(){
    this.name = new FormControl('', Validators.required);
    this.person = new FormControl('', Validators.required);
  }
}
