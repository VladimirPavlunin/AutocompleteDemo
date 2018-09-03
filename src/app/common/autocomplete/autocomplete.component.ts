import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, AfterContentInit {
  @Input() placeHolder: string;
  @Input() options: any[];

  @Input() displayWith: (option: any) => string;
  @Input() displayOptionWith: (option: any) => string;
  @Input() filter: (option: any, filterValue: string) => boolean;
  @ContentChild('input') searchControl: any;
  
  $filteredOptions: Observable<any[]>;

  constructor() {
  }

  ngOnInit() {
    if (this.displayWith === null){
      throw new Error("DisplayWith input property of autocomplete is missing");
    }

    if (this.displayOptionWith === null){
      throw new Error("DisplayOptionWith input property of autocomplete is missing");
    }

    if (this.filter === null){
      throw new Error("Filter input property of autocomplete is missing");
    }
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    if (this.options && this.options.length > 0){
      return this.options.filter(option => this.filter(option, filterValue));
    }

    return [];
  }

  ngAfterContentInit(): void {
    debugger;
    const test = this.searchControl;
    this.$filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof (value) === 'string' ? this._filter(value) : this.options.slice()));
  }

  clearSelection(event: any){
    event.stopPropagation();
    this.searchControl.setValue('');
  }
}
