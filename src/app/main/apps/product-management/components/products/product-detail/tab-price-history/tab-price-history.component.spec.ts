import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPriceHistoryComponent } from './tab-price-history.component';

describe('TabPriceHistoryComponent', () => {
  let component: TabPriceHistoryComponent;
  let fixture: ComponentFixture<TabPriceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPriceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPriceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
