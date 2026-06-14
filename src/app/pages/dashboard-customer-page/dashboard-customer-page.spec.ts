import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerPage } from './dashboard-customer-page';

describe('DashboardCustomerPage', () => {
  let component: DashboardCustomerPage;
  let fixture: ComponentFixture<DashboardCustomerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCustomerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
