import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Book } from 'src/app/interfaces/book.interfcae';
import { BookDialogComponent, BookDialogData } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'my-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookItemComponent implements OnDestroy {

  @Input() book: Book | undefined;
  @Input() interactable: boolean = false;

  @Output() addToWishlist = new EventEmitter<Book>();
  @Output() removeFromWishlist = new EventEmitter<string>();

  private destory$ = new Subject<null>();
  private dialogRef: MatDialogRef<BookDialogComponent> | undefined;

  constructor(private dialog: MatDialog) { }

  showBookDetails(): void {
    const data: BookDialogData = {
      book: this.book!
    }
    this.dialogRef = this.dialog.open(BookDialogComponent, { data: data, height: '80%', width: '40vh' });
    this.handleDialogEvents();
  }

  handleDialogEvents(): void {
    if (this.dialogRef) {
      this.dialogRef.componentInstance.addToWishlist.pipe(
        takeUntil(this.destory$)
      ).subscribe(book => this.emitAdd(book));

      this.dialogRef.componentInstance.removeFromWishlist.pipe(
        takeUntil(this.destory$)
      ).subscribe(id => this.emitRemove(id));
    }

  }

  emitAdd(book: Book): void {
    this.addToWishlist.emit(book);
  }

  emitRemove(id: string): void {
    this.removeFromWishlist.emit(id);
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
    this.dialogRef?.close();
  }

}
