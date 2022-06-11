import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepaComponent } from './create-depa.component';

describe('CreateDepaComponent', () => {
  let component: CreateDepaComponent;
  let fixture: ComponentFixture<CreateDepaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDepaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
