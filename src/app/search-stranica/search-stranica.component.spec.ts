import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStranicaComponent } from './search-stranica.component';

describe('SearchStranicaComponent', () => {
  let component: SearchStranicaComponent;
  let fixture: ComponentFixture<SearchStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
