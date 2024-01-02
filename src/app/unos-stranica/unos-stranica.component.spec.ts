import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosStranicaComponent } from './unos-stranica.component';

describe('UnosStranicaComponent', () => {
  let component: UnosStranicaComponent;
  let fixture: ComponentFixture<UnosStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosStranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnosStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
