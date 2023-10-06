import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicoComponent } from './mecanico.component';

describe('MecanicoComponent', () => {
  let component: MecanicoComponent;
  let fixture: ComponentFixture<MecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MecanicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
