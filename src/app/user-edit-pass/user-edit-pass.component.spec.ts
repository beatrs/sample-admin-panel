import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditPassComponent } from './user-edit-pass.component';

describe('UserEditPassComponent', () => {
  let component: UserEditPassComponent;
  let fixture: ComponentFixture<UserEditPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
