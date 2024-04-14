import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgramsMessagesComponent } from './show-programs-messages.component';

describe('ShowProgramsMessagesComponent', () => {
  let component: ShowProgramsMessagesComponent;
  let fixture: ComponentFixture<ShowProgramsMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProgramsMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProgramsMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
