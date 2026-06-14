import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductPage } from './dashboard-product-page';

describe('DashboardProductPage', () => {
  let component: DashboardProductPage;
  let fixture: ComponentFixture<DashboardProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProductPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardProductPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
