import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScAngularToastify } from './sc-angular-toastify';

describe('ScAngularToastify', () => {
  let component: ScAngularToastify;
  let fixture: ComponentFixture<ScAngularToastify>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScAngularToastify]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScAngularToastify);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
