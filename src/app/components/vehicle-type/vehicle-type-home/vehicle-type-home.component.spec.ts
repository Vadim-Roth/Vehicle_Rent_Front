import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeHomeComponent } from './vehicle-type-home.component';

describe('VehicleTypeHomeComponent', () => {
  let component: VehicleTypeHomeComponent;
  let fixture: ComponentFixture<VehicleTypeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
