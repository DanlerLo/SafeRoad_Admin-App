import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMecanicoComponent } from './view-mecanico.component';

describe('ViewMecanicoComponent', () => {
  let component: ViewMecanicoComponent;
  let fixture: ComponentFixture<ViewMecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMecanicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
