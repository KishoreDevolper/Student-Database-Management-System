import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkyComponent } from './marky.component';

describe('MarkyComponent', () => {
  let component: MarkyComponent;
  let fixture: ComponentFixture<MarkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
