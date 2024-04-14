import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProgramsMessageModalComponent } from './new-programs-message-modal.component';

describe('NewProgramsMessageModalComponent', () => {
  let component: NewProgramsMessageModalComponent;
  let fixture: ComponentFixture<NewProgramsMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProgramsMessageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProgramsMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
