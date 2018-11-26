import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabInfomationComponent } from './tab-infomation.component';

describe('TabInfomationComponent', () => {
  let component: TabInfomationComponent;
  let fixture: ComponentFixture<TabInfomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabInfomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
