import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Input() placeHolder: string;
  @Input() options: any[];
  @Input() selectedOption: any;
  @Output() selectedOptionChange: EventEmitter<any>;

  @Input() displayWith: (option: any) => string;
  @Input() displayOptionWith: (option: any) => string;
  @Input() filter: (option: any, filterValue: string) => boolean;

  searchControl: FormControl;
  $filteredOptions: Observable<any[]>;

  constructor() {
    this.searchControl = new FormControl();
    this.selectedOptionChange = new EventEmitter<any>();
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

    this.$filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof(value) === 'string' ? this._filter(value) : this.options.slice())
    )
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    if (this.options && this.options.length > 0){
      return this.options.filter(option => this.filter(option, filterValue));
    }

    return [];
  }

  onSelected(event: MatAutocompleteSelectedEvent){
    this.selectedOption = event.option.value;
    this.selectedOptionChange.emit(this.selectedOption);
  }

  clearSelection(event: any){
    event.stopPropagation();
    this.searchControl.setValue("");
    this.selectedOption = null;
    this.selectedOptionChange.emit(this.selectedOption);
  }
}
