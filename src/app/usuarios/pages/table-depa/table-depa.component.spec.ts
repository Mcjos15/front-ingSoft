import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDepaComponent } from './table-depa.component';

describe('TableDepaComponent', () => {
  let component: TableDepaComponent;
  let fixture: ComponentFixture<TableDepaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDepaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
