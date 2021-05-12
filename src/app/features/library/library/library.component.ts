import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book, BooksList } from 'src/app/interfaces/book.interfcae';
import { BooksService } from 'src/app/services/books.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'my-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent {

  booksList$: Observable<BooksList | null>;
  private input$ = new Subject<string>();
  page$ = new BehaviorSubject<number>(0);

  constructor(private bookService: BooksService,
    private wishlistService: WishlistService,
  ) {

    this.booksList$ = combineLatest([this.input$, this.page$]).pipe(
      switchMap(([input, page]) => this.bookService.getBooks(input, page))
    );

  }

  onInput(input: string) {
    this.page$.next(0);
    this.input$.next(input);
  }

  onPageEvent(page: number): void {
    this.page$.next(page);
  }

  addToWishlist(book: Book): void {
    this.wishlistService.addToWishlist(book);
  }

  removeFromWishlist(id: string): void {
    this.wishlistService.removeFromWishlist(id);
  }


}
