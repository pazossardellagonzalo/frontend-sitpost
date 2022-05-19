import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPasswordComponent } from './users-password.component';

describe('UsersPasswordComponent', () => {
  let component: UsersPasswordComponent;
  let fixture: ComponentFixture<UsersPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
