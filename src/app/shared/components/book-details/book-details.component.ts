import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/book.interfcae';

@Component({
  selector: 'my-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {

  @Input() book: Book | null = null;
  @Output() addToWishlist = new EventEmitter<Book>();
  @Output() removeFromWishlist = new EventEmitter<string>();

  constructor() { }

}
