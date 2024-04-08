import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExerciseDetailsModalComponent } from './show-exercise-details-modal.component';

describe('ShowExerciseDetailsModalComponent', () => {
  let component: ShowExerciseDetailsModalComponent;
  let fixture: ComponentFixture<ShowExerciseDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowExerciseDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowExerciseDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
