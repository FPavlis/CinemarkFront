import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmStranicaComponent } from './film-stranica.component';

describe('FilmStranicaComponent', () => {
  let component: FilmStranicaComponent;
  let fixture: ComponentFixture<FilmStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmStranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
