import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLoader } from './spinner-loader';

describe('SpinnerLoader', () => {
  let component: SpinnerLoader;
  let fixture: ComponentFixture<SpinnerLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
