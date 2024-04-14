import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateInProgramModalComponent } from './participate-in-program-modal.component';

describe('ParticipateInProgramModalComponent', () => {
  let component: ParticipateInProgramModalComponent;
  let fixture: ComponentFixture<ParticipateInProgramModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipateInProgramModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipateInProgramModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
