import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffcreationComponent } from './staffcreation.component';

describe('StaffcreationComponent', () => {
  let component: StaffcreationComponent;
  let fixture: ComponentFixture<StaffcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffcreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
