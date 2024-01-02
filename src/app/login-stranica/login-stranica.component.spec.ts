import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStranicaComponent } from './login-stranica.component';

describe('LoginStranicaComponent', () => {
  let component: LoginStranicaComponent;
  let fixture: ComponentFixture<LoginStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginStranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
