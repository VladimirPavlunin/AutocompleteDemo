import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get name(): FormControl {
    return <FormControl>this.form.get('name');
  }

  get person(): FormControl {
    return <FormControl>this.form.get('person');
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      person: ['', Validators.required]
    }, { validator: this.crossFieldValidator() });
  }

  crossFieldValidator() {
    return (group: FormGroup): { [key: string]: any } => {
      const name = group.get('name');
      const person = group.get('person');
      let errors = person.errors;
      const isInvalid = name.value && person.value && name.value === person.value.firstName;

      if (isInvalid) {
        if (errors) {
          errors.originEqualsToDestination = true;
        } else {
          errors = {
            originEqualsToDestination: true
          };
        }
      } else {
        if (errors) {
          delete errors.originEqualsToDestination;
          errors = Object.keys(errors).length > 0 ? errors : null;
        }
      }

      person.setErrors(errors);

      return null;
    };
  }
}
