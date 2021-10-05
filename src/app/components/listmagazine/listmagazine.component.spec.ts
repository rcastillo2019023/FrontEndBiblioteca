import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmagazineComponent } from './listmagazine.component';

describe('ListmagazineComponent', () => {
  let component: ListmagazineComponent;
  let fixture: ComponentFixture<ListmagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmagazineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
