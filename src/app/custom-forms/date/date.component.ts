import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "date",
  template: `
    <select class="form-control" (change)="change()" [(ngModel)]="day">
      <option [value]="0">day</option>
      <option *ngFor="let day of [].constructor(31); let i = index" [ngValue]="i + 1">{{i + 1}}</option>
    </select>

    <select class="form-control" (change)="change()" [(ngModel)]="month">
      <option [value]="0">month</option>
      <option *ngFor="let month of [].constructor(12); let i = index" [ngValue]="i + 1">{{i + 1}}</option>
    </select>

    <select class="form-control" (change)="change()" [(ngModel)]="year">
      <option [value]="0">year</option>
      <option *ngFor="let year of years" [ngValue]="year">{{year}}</option>
    </select>
  `,
  styleUrls: ["./date.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateComponent),
    }
  ]
})
export class DateComponent implements ControlValueAccessor {

  day: number;
  month: number;
  year: number;

  years: number[];

  constructor() {
    this.day = 0;
    this.month = 0;
    this.year = 0;

    this.years = Array.from(new Array(100), (val, idx) => (new Date().getFullYear() - 18) - idx);
  }

  change() {
    if (this.day && this.month && this.year) {
      const date = this.year + "-" + this.addZero(this.month) + "-" + this.addZero(this.day);

      this.onChange(new Date(date).toDateString());
      this.onTouch();
    }
  }

  addZero(value: number) {
    return value < 10 ? "0" + value : value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: any) {
    this.onTouch = onTouch;
  }

  writeValue(model: any): void {
  }

  private onChange = (_: any) => {
  }

  private onTouch = () => {
  }
}
