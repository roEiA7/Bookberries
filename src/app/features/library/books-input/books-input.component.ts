import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'my-books-input',
  templateUrl: './books-input.component.html',
  styleUrls: ['./books-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksInputComponent implements OnDestroy {

  @Output() onInput = new EventEmitter<string>();
  @Input() subject: Subject<string> | undefined;

  inputControl: FormControl = new FormControl();
  sub: Subscription;

  constructor() {
    this.sub = this.inputControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(val => !!val),
    ).subscribe(val => this.onInput.emit(val));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
