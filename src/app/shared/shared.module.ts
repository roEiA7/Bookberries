import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { JoinPipe } from './pipes/join.pipe';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';



const components = [
    BooksListComponent,
    BookItemComponent,
    BookDialogComponent,
    BookDetailsComponent,
    TopBarComponent,
]

const pipes = [
    JoinPipe,
]

const modules = [
    ReactiveFormsModule
]

@NgModule({
    declarations: [
        ...components,
        ...pipes,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ...modules,

    ],
    exports: [
        MaterialModule,
        ...components,
        ...modules,
        ...pipes,
    ]
})
export class SharedModule { }