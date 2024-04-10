import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgramDetailsModalComponent } from './show-program-details-modal.component';

describe('ShowProgramDetailsModalComponent', () => {
  let component: ShowProgramDetailsModalComponent;
  let fixture: ComponentFixture<ShowProgramDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProgramDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProgramDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
