import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Book } from 'src/app/interfaces/book.interfcae';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'my-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDialogComponent {

  @Output() addToWishlist = new EventEmitter<Book>();
  @Output() removeFromWishlist = new EventEmitter<string>();

  book$: Observable<Book | null> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookDialogData,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    private bookService: BooksService,
    private snackBar: MatSnackBar
  ) {

    this.book$ = this.data.book.existInWishlist$.pipe(
      switchMap(exist => {
        if (!exist || !this.data.book.volumeInfo.authors) {
          return this.bookService.getBook(this.data.book.id);
        }
        else {
          return of(this.data.book);
        }
      }),
      catchError(err => { this.toastError(); this.dialogRef.close(); return of(null) })
    );
  }

  private openSnackBar(message: string, action: string, duration: number): void {
    this.snackBar.open(message, action, { duration: duration })
  }

  private toastError(): void {
    this.openSnackBar('Oops, something went wrong!', 'yeahy!', 3500);
  }
}

export interface BookDialogData {
  book: Book;
}