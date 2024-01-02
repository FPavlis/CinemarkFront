import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkStranicaComponent } from './bookmark-stranica.component';

describe('BookmarkStranicaComponent', () => {
  let component: BookmarkStranicaComponent;
  let fixture: ComponentFixture<BookmarkStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkStranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
