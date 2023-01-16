import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableUserComponent } from './available-user.component';

describe('AvailableUserComponent', () => {
  let component: AvailableUserComponent;
  let fixture: ComponentFixture<AvailableUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
