import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IntroduccionPage } from './introduccion.page';

describe('IntroduccionPage', () => {
  let component: IntroduccionPage;
  let fixture: ComponentFixture<IntroduccionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IntroduccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
