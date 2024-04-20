import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageToAdvisorModalComponent } from './send-message-to-advisor-modal.component';

describe('SendMessageToAdvisorModalComponent', () => {
  let component: SendMessageToAdvisorModalComponent;
  let fixture: ComponentFixture<SendMessageToAdvisorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMessageToAdvisorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMessageToAdvisorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
