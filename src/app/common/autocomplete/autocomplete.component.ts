import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AutocompleteComponent,
    multi: true
  }]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() selectedOption: any;
  @Output() selectedOptionChange: EventEmitter<any>;
  @Input() placeHolder: string;
  @Input() options: any[];

  @Input() displayWith: (option: any) => string;
  @Input() displayOptionWith: (option: any) => string;
  @Input() filter: (option: any, filterValue: string) => boolean;
  @Input() validator: ValidatorFn;

  searchControl: FormControl;
  $filteredOptions: Observable<any[]>;
  _onChange: (_: any) => void;

  constructor() {
    this.searchControl = new FormControl('');
    this.selectedOptionChange = new EventEmitter<any>();
  }

  writeValue(value) {
    this.searchControl.setValue(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn) {
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

    this.searchControl.setValidators(this.validator);

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
    this.emitSelected(event.option.value);

  }

  clearSelection(event: any){
    event.stopPropagation();
    this.emitSelected(null);
  }

  emitSelected(selectedOption: any){
    this.selectedOption = selectedOption;
    this.selectedOptionChange.emit(this.selectedOption);
    this._onChange(this.selectedOption);
  }
}
