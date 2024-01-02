import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByStranicaComponent } from './sort-by-stranica.component';

describe('SortByStranicaComponent', () => {
  let component: SortByStranicaComponent;
  let fixture: ComponentFixture<SortByStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortByStranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortByStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
