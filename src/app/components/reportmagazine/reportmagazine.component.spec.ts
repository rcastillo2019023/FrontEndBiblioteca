import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportmagazineComponent } from './reportmagazine.component';

describe('ReportmagazineComponent', () => {
  let component: ReportmagazineComponent;
  let fixture: ComponentFixture<ReportmagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportmagazineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportmagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
