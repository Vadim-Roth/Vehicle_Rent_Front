import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesHomeComponent } from './branches-home.component';

describe('BranchesHomeComponent', () => {
  let component: BranchesHomeComponent;
  let fixture: ComponentFixture<BranchesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
