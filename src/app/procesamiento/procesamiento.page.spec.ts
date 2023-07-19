import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ProcesamientoPage } from './procesamiento.page';

describe('ProcesamientoPage', () => {
  let component: ProcesamientoPage;
  let fixture: ComponentFixture<ProcesamientoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcesamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
