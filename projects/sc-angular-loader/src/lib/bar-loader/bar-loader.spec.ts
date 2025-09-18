import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLoader } from './bar-loader';

describe('BarLoader', () => {
  let component: BarLoader;
  let fixture: ComponentFixture<BarLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
