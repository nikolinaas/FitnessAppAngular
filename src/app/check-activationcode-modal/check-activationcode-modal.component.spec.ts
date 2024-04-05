import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckActivationcodeModalComponent } from './check-activationcode-modal.component';

describe('CheckActivationcodeModalComponent', () => {
  let component: CheckActivationcodeModalComponent;
  let fixture: ComponentFixture<CheckActivationcodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckActivationcodeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckActivationcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
