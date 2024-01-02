import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieManagementStranicaComponent } from './movie-management-stranica.component';

describe('MovieManagementStranicaComponent', () => {
  let component: MovieManagementStranicaComponent;
  let fixture: ComponentFixture<MovieManagementStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieManagementStranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieManagementStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
