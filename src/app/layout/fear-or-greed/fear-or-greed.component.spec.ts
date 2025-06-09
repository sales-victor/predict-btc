import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FearOrGreedComponent } from './fear-or-greed.component';

describe('FearOrGreedComponent', () => {
  let component: FearOrGreedComponent;
  let fixture: ComponentFixture<FearOrGreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FearOrGreedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FearOrGreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
