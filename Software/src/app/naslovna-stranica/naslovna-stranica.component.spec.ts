import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaslovnaStranicaComponent } from './naslovna-stranica.component';

describe('NaslovnaStranicaComponent', () => {
  let component: NaslovnaStranicaComponent;
  let fixture: ComponentFixture<NaslovnaStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaslovnaStranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaslovnaStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
