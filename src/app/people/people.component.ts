import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';

export interface IPerson {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
};

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PeopleComponent,
    multi: true
  }]
})

export class PeopleComponent implements OnInit, ControlValueAccessor {
  @Input() validator: ValidatorFn;
  people: IPerson[];
  selectedPerson: FormControl;
  _onChange: (_: any) => void;

  constructor() {
    this.selectedPerson = new FormControl();
    this.people = [
      { firstName: 'Ivan', lastName: 'Petrov', age: 30, address: 'Zhlobin'},
      { firstName: 'Ivars', lastName: 'Foooo', age: 30, address: 'Zhlobin'},
      { firstName: 'Irina', lastName: 'Prrrrr', age: 30, address: 'Zhlobin'},
      { firstName: 'Gleb', lastName: 'Glebov', age: 30, address: 'Zhlobin'},
      { firstName: 'Simon', lastName: 'Wilson', age: 35, address: 'Manchester'},
      { firstName: 'Wilson', lastName: 'Alwaris', age: 32, address: 'London'}
    ]
  }

  writeValue(value) {
    this.selectedPerson.setValue(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn) {
  }

  onPersonSelected(person: IPerson){
    this.selectedPerson.setValue(person);
    this._onChange(person);
  }

  private displayPerson(person?: IPerson): string | undefined {
    return person ? `${person.firstName} ${person.lastName}` : undefined;
  }

  public filterFn(person: IPerson, searchValue: string): boolean {
    return person.firstName.toLowerCase().indexOf(searchValue) >= 0 ||
      person.lastName.toLowerCase().indexOf(searchValue) >= 0;
  }

  ngOnInit() {
    this.selectedPerson.setValidators(this.validator);
  }
}
