import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkoutsComponent } from './my-workouts.component';

describe('MyWorkoutsComponent', () => {
  let component: MyWorkoutsComponent;
  let fixture: ComponentFixture<MyWorkoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyWorkoutsComponent]
    });
    fixture = TestBed.createComponent(MyWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
