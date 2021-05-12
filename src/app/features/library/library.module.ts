import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library/library.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BooksInputComponent } from './books-input/books-input.component';


@NgModule({
  declarations: [
    LibraryComponent,
    BooksInputComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule
  ]
})
export class LibraryModule { }
