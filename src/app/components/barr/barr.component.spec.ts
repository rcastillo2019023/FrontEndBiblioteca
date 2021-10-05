import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrComponent } from './barr.component';

describe('BarrComponent', () => {
  let component: BarrComponent;
  let fixture: ComponentFixture<BarrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
