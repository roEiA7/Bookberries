import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book, BooksList } from 'src/app/interfaces/book.interfcae';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'my-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent {

  booksList$: Observable<BooksList | null>;
  page$ = new BehaviorSubject<number>(0);

  constructor(
    private wishlistService: WishlistService,
  ) {
    this.booksList$ = this.page$.pipe(
      switchMap(page => this.wishlistService.getWishlistPage(page))
    );
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