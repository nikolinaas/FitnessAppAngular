import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageToUserModalComponent } from './send-message-to-user-modal.component';

describe('SendMessageToUserModalComponent', () => {
  let component: SendMessageToUserModalComponent;
  let fixture: ComponentFixture<SendMessageToUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMessageToUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMessageToUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
