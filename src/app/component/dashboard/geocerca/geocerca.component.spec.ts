import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeocercaComponent } from './geocerca.component';

describe('GeocercaComponent', () => {
  let component: GeocercaComponent;
  let fixture: ComponentFixture<GeocercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeocercaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeocercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
