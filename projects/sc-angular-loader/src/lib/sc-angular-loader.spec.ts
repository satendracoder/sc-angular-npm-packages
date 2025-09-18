import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScAngularLoader } from './sc-angular-loader';

describe('ScAngularLoader', () => {
  let component: ScAngularLoader;
  let fixture: ComponentFixture<ScAngularLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScAngularLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScAngularLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
