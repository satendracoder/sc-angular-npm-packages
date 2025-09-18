import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsLoader } from './dots-loader';

describe('DotsLoader', () => {
  let component: DotsLoader;
  let fixture: ComponentFixture<DotsLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotsLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotsLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
