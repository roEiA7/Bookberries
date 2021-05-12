import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Book, BooksList } from '../interfaces/book.interfcae';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlist$ = new BehaviorSubject<BooksList>(initialList);

  constructor() { }

  private get wishlist(): BooksList {
    return this.wishlist$.getValue();
  }

  private set wishlist(val: BooksList) {
    this.wishlist$.next(val);
  }

  getWishlist(): Observable<BooksList> {
    return this.wishlist$.asObservable();
  }

  getWishlistPage(page: number): Observable<BooksList> {
    const startIndex = page * maxResults; const endIndex = startIndex + maxResults;
    return this.getWishlist().pipe(
      map(list => ({ items: list.items.slice(startIndex, endIndex), totalItems: list.totalItems }))
    );
  }

  addToWishlist(book: Book): void {
    const copy: BooksList = { ...this.wishlist };
    copy.items.push(book);
    copy.totalItems++;
    this.wishlist = copy;
  }

  removeFromWishlist(id: string) {
    const copy: BooksList = { ...this.wishlist };
    copy.items = copy.items.filter(item => item.id !== id);
    copy.totalItems--;
    this.wishlist = copy;
  }

  existInWishlist(id: string): Observable<boolean> {
    return this.getWishlist().pipe(
      map(list => list.items.filter(item => item.id === id).length === 1),
      shareReplay(1)
    );
  }
}

export const maxResults = 20;
const initialList = { items: [], totalItems: 0 }
