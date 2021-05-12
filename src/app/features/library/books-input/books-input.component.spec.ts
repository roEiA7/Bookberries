import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksInputComponent } from './books-input.component';

describe('BooksInputComponent', () => {
  let component: BooksInputComponent;
  let fixture: ComponentFixture<BooksInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
