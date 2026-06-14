import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrdersPage } from './dashboard-orders-page';

describe('DashboardOrdersPage', () => {
  let component: DashboardOrdersPage;
  let fixture: ComponentFixture<DashboardOrdersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOrdersPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardOrdersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
