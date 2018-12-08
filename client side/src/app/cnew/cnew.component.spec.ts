import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnewComponent } from './cnew.component';

describe('CnewComponent', () => {
  let component: CnewComponent;
  let fixture: ComponentFixture<CnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
