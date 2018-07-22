import { Component, OnInit } from '@angular/core';

export interface IPerson {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
};

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})

export class PeopleComponent implements OnInit {
  people: IPerson[];
  person: IPerson;

  constructor() {
    this.person = null;
    this.people = [
      { firstName: 'Ivan', lastName: 'Petrov', age: 30, address: 'Zhlobin'},
      { firstName: 'Ivars', lastName: 'Foooo', age: 30, address: 'Zhlobin'},
      { firstName: 'Irina', lastName: 'Prrrrr', age: 30, address: 'Zhlobin'},
      { firstName: 'Gleb', lastName: 'Glebov', age: 30, address: 'Zhlobin'},
      { firstName: 'Simon', lastName: 'Wilson', age: 35, address: 'Manchester'},
      { firstName: 'Wilson', lastName: 'Alwaris', age: 32, address: 'London'}
    ]
  }

  private displayPerson(person?: IPerson): string | undefined {
    return person ? `${person.firstName} ${person.lastName}` : undefined;
  }

  public filterFn(person: IPerson, searchValue: string): boolean {
    return person.firstName.toLowerCase().indexOf(searchValue) >= 0 ||
      person.lastName.toLowerCase().indexOf(searchValue) >= 0;
  }

  ngOnInit() {
  }
}
