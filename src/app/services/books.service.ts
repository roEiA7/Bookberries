import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book, BooksList } from '../interfaces/book.interfcae';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WishlistService, maxResults } from './wishlist.service';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl = `${environment.booksApiUrl}volumes`;


  constructor(
    private httpClient: HttpClient,
    private wishlistService: WishlistService
  ) { }

  getBooks(query: string, page: number): Observable<BooksList> {
    const requiredFields = 'totalItems,items(id,volumeInfo(imageLinks,subtitle,title))';
    let params = new HttpParams();
    params = params.append('q', query);
    params = params.append('maxResults', maxResults.toString());
    params = params.append('startIndex', (page * maxResults).toString());
    params = params.append('fields', requiredFields);

    return this.httpClient.get<BooksList>(this.baseUrl, { params }).pipe(
      map(list => {
        list.items = list.items.map(item => {
          item.existInWishlist$ = this.wishlistService.existInWishlist(item.id);
          return item;
        });
        return list;
      })
    )
  }

  getBook(id: string): Observable<Book> {
    const requiredFields = 'id,volumeInfo(authors,categories,imageLinks,pageCount,publisher,publishedDate,description,subtitle,title)';
    let params = new HttpParams();
    params = params.append('fields', requiredFields);

    return this.httpClient.get<Book>(`${this.baseUrl}/${id}`, { params }).pipe(
      map(book => {
        book.existInWishlist$ = this.wishlistService.existInWishlist(book.id);
        return book;
      })
    )
  }
}

