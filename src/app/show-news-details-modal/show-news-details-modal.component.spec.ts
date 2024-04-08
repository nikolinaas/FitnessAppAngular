import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNewsDetailsModalComponent } from './show-news-details-modal.component';

describe('ShowNewsDetailsModalComponent', () => {
  let component: ShowNewsDetailsModalComponent;
  let fixture: ComponentFixture<ShowNewsDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowNewsDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowNewsDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
