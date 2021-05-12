import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Book, BooksList } from 'src/app/interfaces/book.interfcae';

@Component({
  selector: 'my-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setBreakPoint();
  }

  @Input() booksList: BooksList | null = null;
  @Input() pageIndex: number | null = 0;
  @Input() interactable: boolean = false;

  @Output() pageEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() addToWishlist = new EventEmitter<Book>();
  @Output() removeFromWishlist = new EventEmitter<string>();


  breakpoint!: number;

  constructor() {
    this.setBreakPoint();
  }

  setBreakPoint(): void {
    this.breakpoint = (window.innerWidth <= 620) ? 2 : 5;
  }

}
